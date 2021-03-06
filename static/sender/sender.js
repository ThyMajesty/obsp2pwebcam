(function () {

    var lastPeerId = null;
    var peer = null; // own peer object
    var conn = null;
    var recvIdInput = document.getElementById("receiver-id");
    var receiverId = null;
    var status = document.getElementById("status");
    var connectButton = document.getElementById("connect-button");
    var videoLocal = document.getElementById("local");
    var videoRemote = document.getElementById("remote");
    var constraints = { audio: false, video: true};
    var key = null;

    const startChat = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoLocal.srcObject = localStream;
        console.log(peer);
        const call = peer.call(receiverId, localStream);
        call.on('stream', remoteStream => {
            videoRemote.srcObject = remoteStream
        })
    };
    /**
     * Create the Peer object for our end of the connection.
     *
     * Sets up callbacks that handle any events related to our
     * peer object.
     */
    function initialize() {
        // Create own peer object with connection to shared PeerJS server
        peer = new Peer(null, {host: 'obsp2pwebcanstream.herokuapp.com', secure:true, port:443, key: 'peerjs', debug: 3, path: '/peer'});
        //peer = new Peer(null, {});
        console.log(peer);
        key = (new URLSearchParams(window.location.search)).get('key') || null;
        if (key) {
            join();
        }
        peer.on('open', function (id) {
            // Workaround for peer.reconnect deleting previous id
            if (peer.id === null) {
                console.log('Received null id from peer open');
                peer.id = lastPeerId;
            } else {
                lastPeerId = peer.id;
            }

            console.log('ID: ' + peer.id);
        });
        peer.on('disconnected', function () {
            status.innerHTML = "Connection lost. Please reconnect";
            console.log('Connection lost. Please reconnect');

            // Workaround for peer.reconnect deleting previous id
            peer.id = lastPeerId;
            peer._lastServerId = lastPeerId;
            peer.reconnect();
        });
        peer.on('close', function() {
            conn = null;
            status.innerHTML = "Connection destroyed. Please refresh";
            console.log('Connection destroyed');
            peer.id = lastPeerId;
            peer._lastServerId = lastPeerId;
            peer.reconnect();
        });
        peer.on('error', function (err) {
            console.log(err);
            status.innerHTML =  err;
        });
    };

    /**
     * Create the connection between the two Peers.
     *
     * Sets up callbacks that handle any events related to the
     * connection and data received on it.
     */
    function join() {
        // Close old connection
        if (conn) {
            conn.close();
        }

        // Create connection to destination peer specified in the input field
        receiverId = recvIdInput.value || key;
        conn = peer.connect(receiverId, {
            reliable: true
        });

        conn.on('open', function () {
            status.innerHTML = "Connected to: " + conn.peer;
            console.log("Connected to: " + conn.peer);

            // Check URL params for comamnds that should be sent immediately
            var command = getUrlParam("command");
            if (command)
                conn.send(command);
            startChat();
        });
    };

    function getUrlParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return null;
        else
            return results[1];
    };

    connectButton.addEventListener('click', join);
    initialize();
})();

const PeerServer = require('peer').PeerServer;
const server = PeerServer({host: 'localhost', port: 9000, path: '/index.html'});
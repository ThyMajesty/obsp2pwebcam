var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var ExpressPeerServer = require('peer').ExpressPeerServer;
var path = require('path')
var http = require('http');
var fs = require('fs');


var server = http.createServer(app).listen(PORT);


// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/peer', ExpressPeerServer(server, {debug:true}));
app.use('/', express.static(path.join(__dirname, '/static')))
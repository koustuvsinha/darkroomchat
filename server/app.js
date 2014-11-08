/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

//Socket.io
var io = require('socket.io')(server, {origins : '*:*'});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

//Configure sockets
io.on('connection',function(socket) {
	socket.on('send msg',function(data) {
		io.emit('get msg',data);
	});
});

//enable cors

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://"+req.headers.host+':9000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Expose app
exports = module.exports = app;

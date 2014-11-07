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
var io = require('socket.io').listen(server);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

//Configure sockets
io.sockets.on('connection',function(socket) {
	socket.on('send msg',function(data) {
		io.sockets.emit('get msg',data);
	});
});

// Expose app
exports = module.exports = app;

/**
 * An example of how to run Socket.IO over multiple subdomains
 * Author : Stephen Braitsch
 * More Info : http://github.com/braitsch/sub.socket.io
 */

var path = require('path');
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

// create the single instance of socket.io that will be shared across all applications //
global.host = 'localhost';
global.root = path.resolve('../');
global.socket = require('socket.io').listen(server);
global.socket.set('log level', 1);
global.socket.set('transports', [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

// create our root application //
app.configure(function(){
	app.set('port', 8080);
	app.set('views', __dirname + '/app/server/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express.bodyParser());
	app.use(express.methodOverride());
// create the subdomain applications //
	app.use(express.vhost('sub1.' + global.host, require('./subdomains/sub1')));
	app.use(express.vhost('sub2.' + global.host, require('./subdomains/sub2')));
	app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
	app.use(express.static(__dirname + '/app/public'));
});

require('./app/server/router')(app);
require('./app/server/modules/chat-socket');

server.listen(app.get('port'), function(){
  	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
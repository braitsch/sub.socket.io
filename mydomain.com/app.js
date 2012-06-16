
/**
 * An example of how to run Socket.IO over multiple subdomains
 * Author : Stephen Braitsch
 * More Info : http://github.com/braitsch/sub.socket.io
 */

var path = require('path');
var exp = require('express');
var app = exp.createServer();

app.root = __dirname;

global.host = 'localhost';
global.root = path.resolve('../');

// create the single instance of socket.io that will be shared across all applications //
global.socket = require('socket.io').listen(app);
global.socket.set('log level', 1);
global.socket.set('transports', [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

// create subdomain applications //
app.use(exp.vhost('sub1.' + global.host, require('./subdomains/sub1')));
app.use(exp.vhost('sub2.' + global.host, require('./subdomains/sub2')));

// finally create this application, our root server //
require('./app/config')(app, exp);
require('./app/server/router')(app);
require('./app/server/modules/chat-socket');

app.listen(8080, function(){
  	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
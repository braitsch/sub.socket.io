
/**
 * An example of how to run Socket.IO over multiple subdomains
 * Author : Stephen Braitsch
 * More Info : 
 */

var exp = require('express');
var app = exp.createServer();

global.socket = require('socket.io').listen(app);
global.socket.set('log level', 1);
global.socket.set('transports', [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

global.host = 'localhost';
global.multiSocketMode = false;

// create subdomain applications //
//app.use(exp.vhost('sub1.' + global.host, require('./subdomains/sub1')));
//app.use(exp.vhost('sub2.' + global.host, require('./subdomains/sub2')));

app.root = __dirname;
require('./app/config')(app, exp);
require('./app/server/router')(app);

app.listen(8080, function(){
  	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
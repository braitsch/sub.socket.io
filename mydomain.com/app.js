
/**
 * An example of how to run Socket.IO over multiple subdomains
 * Author : Stephen Braitsch
 * More Info : http://github.com/braitsch/sub.socket.io
 */

var express = require('express');
var app = express();
var path = require('path');
var vhost = require('vhost');
var server  = require('http').createServer(app);

// create the single instance of socket.io that will be shared across all applications //
global.io = require('socket.io').listen(server);
global.root_directory = path.resolve('../');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'pug');
app.use(vhost('sub1.*', require('./subdomains/sub1')));
app.use(vhost('sub2.*', require('./subdomains/sub2')));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

require('./app/server/routes')(app);

server.listen(app.get('port'), function(){
	console.log('Express app listening at http://%s:%s', server.address().address, server.address().port);
});

/**
 * An example of how to run Socket.IO over multiple subdomains
 * Author : Stephen Braitsch
 * More Info : http://github.com/braitsch/sub.socket.io
 */

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var vhost = require('vhost');

// create the single instance of socket.io that will be shared across all applications //
global.io = require('socket.io')(http);
global.root = path.resolve('../');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
app.use(vhost('sub1.*', require('./subdomains/sub1')));
app.use(vhost('sub2.*', require('./subdomains/sub2')));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

require('./app/server/routes')(app);

http.listen(app.get('port'), function()
{
	console.log('Express server listening on port', app.get('port'));
});

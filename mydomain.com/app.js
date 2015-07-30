
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
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

// create the single instance of socket.io that will be shared across all applications //
global.root = path.resolve('../');
global.io = require('socket.io')(http);

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(vhost('sub1.' + global.host, require('./subdomains/sub1')));
app.use(vhost('sub2.' + global.host, require('./subdomains/sub2')));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

require('./app/server/routes')(app);
require('./app/server/modules/chat-socket');

if (app.get('env') == 'development') app.use(errorHandler());

http.listen(app.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

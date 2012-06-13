
/**
 * This is where you place code specific to this Socket.IO channel
 */

var colors = ['#AE331F', '#D68434', '#116A9F', '#360B95', '#5F209E'];

var SM = require('./socket-manager');
// if this app is running from a subdomain, prepend this with name of that subdomain //
	SM.init(global.host);

SM.onConnect = function(socket)
{
	socket.on('user-message', function(data) { 
		socket.uName = data.name;
		data.color = socket.color;
		brodcastMessage(socket, 'user-message', data);
	});
// give each connected user a random color so it's easier to tell them apart in the chat log //
	socket.on('user-connected', function(data) { 
		socket.name = data.name;
		socket.color = data.color = colors[Math.floor(Math.random() * colors.length)];
		brodcastMessage(socket, 'user-connected', data);
	});	
}

SM.onDisconnect = function(socket)
{
	brodcastMessage(socket, 'user-disconnected', {name : socket.name, color : socket.color});
}

var brodcastMessage = function(socket, message, data)
{
// remove socket.emit if you don't want the sender to receive their own message //
	socket.emit(message, data);
	socket.broadcast.emit(message, data);
}
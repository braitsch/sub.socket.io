

module.exports = function()
{
	var colors = ['#AE331F', '#D68434', '#116A9F', '#360B95', '#5F209E'];
	var connections = { };
	
	global.socket.of('/chat-sub2').on('connection', function(socket) {
	
	// give each connected user a random color so it's easier to tell them apart in the chat log //
		socket.on('user-ready', function(data) {
			socket.name = data.name;
			socket.color = data.color = colors[Math.floor(Math.random() * colors.length)];
			brodcastMessage('user-ready', data);
		});

		socket.on('user-message', function(data) {
			socket.uName = data.name;
			data.color = socket.color;
			brodcastMessage('user-message', data);
		});

		function dispatchStatus()
		{
			brodcastMessage('status', connections);
		}
		
		function brodcastMessage(message, data)
		{
	//	remove socket.emit if you don't want the sender to receive their own message //
			socket.emit(message, data);
			socket.broadcast.emit(message, data);
		}
		
	// handle connections & disconnections //	
		connections[socket.id] = {}; dispatchStatus();
		socket.on('disconnect', function() {
			delete connections[socket.id]; dispatchStatus();
			brodcastMessage('user-disconnected', { name : socket.name, color : socket.color });
		});

	});
}();
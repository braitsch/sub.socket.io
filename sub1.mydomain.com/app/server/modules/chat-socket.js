

module.exports = function()
{
	var colors = ['#AE331F', '#D68434', '#116A9F', '#360B95', '#5F209E'];
	var connections = { };

	io.on('connection', function(socket) {
	// give each connected user a random color so it's easier to tell them apart in the chat log //
		socket.on('user-ready', function(data) {
			socket.name = data.name;
			socket.color = data.color = colors[Math.floor(Math.random() * colors.length)];
		});

		socket.on('user-message', function(data) {
			socket.uName = data.name;
			data.color = socket.color;
		});

	// handle connections & disconnections //
		connections[socket.id] = {};
		socket.on('disconnect', function() {
			delete connections[socket.id];
		});
	});
}();
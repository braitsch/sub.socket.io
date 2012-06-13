$(document).ready(function() {

// give user a generic name to start //
	$('#msg').focus();
	$('#name').val(Math.random().toFixed(8).toString().substr(2));
	$('#btn-send').click(function(){ socket.emit('user-message', {name : $('#name').val() , message : $('#msg').val() }); })

// initialize the socket connection //
	socket = io.connect();
	socket.on('status', function (data) {
		var i=0; for (p in data.connections) i++;
		$('#connected').text(i + ' People Currently Connected');
	});
	socket.on('user-connected', function (data) {
		$('#incoming').append('<span class="shadow" style="color:'+data.color+'">'+data.name +' :: connected</span><br>');
		autoScroll();
	});
	socket.on('user-message', function (data) {
		$('#incoming').append('<span class="shadow" style="color:'+data.color+'">'+data.name +' :: '+ data.message+'</span><br>');
		autoScroll();
	});
	socket.on('user-disconnected', function (data) {
		$('#incoming').append('<span class="shadow" style="color:'+data.color+'">'+data.name +' :: disconnected</span><br>');
		autoScroll();
	});
	
	socket.emit('user-connected', {name : $('#name').val() });
	
	var autoScroll = function() { document.getElementById('incoming').scrollTop = document.getElementById('incoming').scrollHeight; }
	
});
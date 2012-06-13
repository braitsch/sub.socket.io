
/**
 * Socket Manager to Track Application Specific Connections
 * Author :: Stephen Braitsch
 */

var SM = { }
module.exports = SM;
	
SM.init = function(host)
{
	this.host = host;
	this.connections = { };
	global.socket.on('connection', SM.registerSocket);
}

SM.registerSocket = function(socket)
{
// listen for connections events //
	SM.onSocketConnect(socket);
	socket.on('disconnect', function() { SM.onSocketDisconnect(socket); });
}

SM.onSocketConnect = function(socket)
{
	if (SM.validateHost(socket) == false) return;
	console.log('connecting ---', socket.handshake.headers.host);
	if (SM.onConnect != undefined) SM.onConnect(socket);
	// dispatch to clients //
	SM.connections[socket.id] = {};
	global.socket.sockets.emit('status', { connections:SM.connections });
}

SM.onSocketDisconnect = function(socket)
{	
	if (SM.validateHost(socket) == false) return;
	console.log('disconnecting --- ', socket.handshake.headers.host, socket.id);
	if (SM.onDisconnect != undefined) SM.onDisconnect(socket);
	// dispatch to clients //
	delete SM.connections[socket.id];
	global.socket.sockets.emit('status', { connections:SM.connections });
}

SM.validateHost = function(socket)
{
	if (!global.multiSocketMode){
		return true;
	}	else{
		return (socket.handshake.headers.host.indexOf(SM.host) != -1);
	}
}

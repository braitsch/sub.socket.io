
require('./modules/chat-socket');

module.exports = function(app) {

	app.get('/', function(req, res){
		res.render('index', { title: 'Node.js Chat Server'});
	});	
	
};
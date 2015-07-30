
module.exports = function(app, express)
{
	var bodyParser = require('body-parser');
	app.set('views', app.root + '/app/server/views');
	app.set('view engine', 'jade');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(require('stylus').middleware({ src: app.root + '/app/public' }));
	app.use(express.static(app.root + '/app/public'));
}
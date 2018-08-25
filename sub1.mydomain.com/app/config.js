
module.exports = function(app, express)
{
	app.set('views', app.root + '/app/server/views');
	app.set('view engine', 'pug');
	app.use(require('stylus').middleware({ src: app.root + '/app/public' }));
	app.use(express.static(app.root + '/app/public'));
}
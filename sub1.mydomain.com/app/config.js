
module.exports = function(app, express, stylus)
{
	app.set('views', app.root + '/app/server/views');
	app.set('view engine', 'pug');
	app.use(stylus.middleware({ src: app.root + '/app/public' }));
	app.use(express.static(app.root + '/app/public'));
}
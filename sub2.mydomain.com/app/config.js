
module.exports = function(app, express) {

	app.configure(function(){
		app.set('views', app.root + '/app/server/views');
		app.set('view engine', 'jade');
		app.locals.pretty = true;
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(require('stylus').middleware({ src: app.root + '/app/public' }));
		app.use(express.static(app.root + '/app/public'));
	});

}
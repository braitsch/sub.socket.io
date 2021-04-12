
module.exports = function(app, express) {

	app.set('views', __dirname + '/app/server/views');
	app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
// express.static must come after stylus middleware & before routes //
	app.use(express.static(__dirname + '/app/public'));
	require(__dirname + '/app/server/routes')(app);

}
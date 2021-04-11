
module.exports = function(app) {

	require(__dirname + '/app/server/routes')(app);
	app.set('views', __dirname + '/app/server/views');
	app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
	app.use(require('express').static(__dirname + '/app/public'));

}
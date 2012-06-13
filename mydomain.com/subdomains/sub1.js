
/**
 * sub1.mydomain.com
 */

var exp = require('express');
var app = exp.createServer();

app.root = __dirname.substr(0, __dirname.length - 9) + '/sub1';

require(app.root + '/app/config')(app, exp);
require(app.root + '/app/server/router')(app);
require(app.root + '/app/server/modules/sub1-socket');	

module.exports = app;
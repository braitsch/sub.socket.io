
/**
 * sub1.mydomain.com
 */

var exp = require('express');
var app = exp.createServer();

app.root = global.root + '/sub1.mydomain.com';

require(app.root + '/app/config')(app, exp);
require(app.root + '/app/server/router')(app);
require(app.root + '/app/server/modules/chat-socket');

module.exports = app;
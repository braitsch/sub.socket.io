
/**
 * sub2.mydomain.com
 */

var express = require('express');
var app = express();

app.root = global.root_directory + '/sub2.mydomain.com';

require(app.root + '/app/config')(app, express);
require(app.root + '/app/server/routes')(app);
require(app.root + '/app/server/modules/chat-socket');

module.exports = app;
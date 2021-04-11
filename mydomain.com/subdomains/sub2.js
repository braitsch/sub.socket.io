
/**
 * sub2.mydomain.com
 */

const express = require('express');
const stylus = require('stylus')
const app = express();

app.root = global.root_directory + '/sub2.mydomain.com';

require(app.root + '/app/config')(app, express, stylus);
require(app.root + '/app/server/routes')(app);
require(app.root + '/app/server/modules/chat-socket');

module.exports = app;
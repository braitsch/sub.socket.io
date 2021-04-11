
const path 		= require('path');
const dotenv 	= require('dotenv').config();
const express 	= require('@braitsch/express');

const app = express();

express.log('./logs');

express.https(app);

global.io = require('socket.io')(server);
global.root_directory = path.resolve('../');

const vhost = require('vhost');
const host = process.env.HOST || 'localhost';
app.use(vhost('sub1.*', require('./subdomains/sub1')));
app.use(vhost('sub2.*', require('./subdomains/sub2')));

express.init(__dirname, app);

express.start(app);
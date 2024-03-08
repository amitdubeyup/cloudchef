const Express = require('express');
const Router = Express.Router();
const Routes = require('./nodes.routes');

Router.use('/nodes', Routes);

module.exports = Router;

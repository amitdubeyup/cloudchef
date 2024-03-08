const Express = require('express');
const Router = Express.Router();
const Controller = require('../controllers/nodes');
const multer = require('multer');
const Upload = multer({ dest: 'public/' });

Router.get('/fetch', Controller.fetchNodes);
Router.post('/upload', Upload.single('nodes'), Controller.uploadNodes);

module.exports = Router;

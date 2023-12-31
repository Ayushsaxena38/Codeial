//first require express , here when you require express it will not create a new instance of express
//instead of creating the new instance , it will use the already created express or call the express which is created in entry file of the server
const express = require('express');

//create the router with the help of express.Router()
const router = express.Router();

//now aquire the controller file from controller folder
const homeController = require('../controllers/home_controller');

const userController = require('./users');

const postController = require('./posts');

const commentController = require('./comments');

const passport = require('passport');

console.log('Router is loaded');

//now add the apropriate action according to the url

router.get('/',passport.checkAuthenticationFeed, homeController.userHome);

router.get('/about',homeController.about);

router.use('/users', userController);

router.use('/posts',postController);

router.use('/comments',commentController);

//for api 
router.use('/api',require('./api/index'));

//just for a example if you want to add more routes use following comment
//router.use('/routerName',require('./routerFile'));

//now exports the module so that index.js(entry file of server) can use this router 

module.exports = router;
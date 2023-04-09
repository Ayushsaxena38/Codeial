const express = require('express');
const router = express.Router();



const userController = require('../controllers/users_controller');

router.post('/create-session',userController.profile);

router.get('/login',userController.login);

router.get('/create',userController.signup);

router.post('/create-acn', userController.create);


module.exports = router;
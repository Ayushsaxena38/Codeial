const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controllers/users_controller');

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/login'}
)
,userController.profile);

router.get('/login',userController.login);

router.get('/create',userController.signup);

router.post('/create-acn', userController.create);

router.get('/check',userController.check);//<-- this was made to check that how to see data on postman softwere

router.get("/userPage",passport.checkAuthentication,userController.userPage);

router.post('/delete-session',userController.deleteSession);

module.exports = router;
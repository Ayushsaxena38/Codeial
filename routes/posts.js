const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthenticationFeed,postController.createPost);
router.get('/delete/:id',passport.checkAuthentication,postController.delete);

module.exports = router;
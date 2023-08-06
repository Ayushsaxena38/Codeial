const express = require('express');
const router = express.Router();
const userApiController = require('../../../controllers/api/v1/users_api');

router.get('/',userApiController.users);
router.get('/createSession', userApiController.createSession);


module.exports = router;
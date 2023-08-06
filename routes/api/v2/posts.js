const express = require('express');
const router = express.Router();
const postsApiController = require('../../../controllers/api/v2/posts_api');

router.get('/',postsApiController.index);

module.exports = router;
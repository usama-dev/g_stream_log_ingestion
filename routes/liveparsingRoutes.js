const express = require('express');
const router = express.Router();
const liveParsingController = require('../controllers/liveParsingController')


router.route('/')
    .get(liveParsingController.get)
    .post(liveParsingController.post);


module.exports = router;

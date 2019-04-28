const express = require('express');
const router = express.Router();
const vodParsingController = require('../controllers/vodParsingController')


router.route('/')
    .get(vodParsingController.get)
    .post(vodParsingController.post);

module.exports = router;

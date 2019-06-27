const express = require('express');
const router = express.Router();
const liveParsingController = require('../controllers/liveParsingController')


router.route('/')
    .get(liveParsingController.get)
    .post(liveParsingController.post);  // POST not consumed by any Svc (shifted to stream stats svc)


module.exports = router;

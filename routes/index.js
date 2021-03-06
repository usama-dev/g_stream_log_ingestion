const express = require('express');
const router = express.Router();


// Service Label
router.get('/', (req, res) => res.send("Streamlogs Ingestion Microservice"));

// Parser Routes
router.use('/liveparsing',    	require('./liveparsingRoutes'));
router.use('/vodparsing',    	require('./vodparsingRoutes'));


module.exports = router;
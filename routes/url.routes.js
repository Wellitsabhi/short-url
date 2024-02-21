const express = require('express');
const router = express.Router();
const { handlegenerateNewShortUrl, handleGetAnalytics } = require('../controllers/url.controllers.js');

router.post('/', handlegenerateNewShortUrl)

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;
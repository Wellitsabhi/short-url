const shortid = require('shortid');
const Url = require('../models/url.models');

//  Generate short url
async function handlegenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(404).json({ error: "url is required" });

    const shortID = shortid();

    await Url.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render('home',{
        id: shortID,
    } )
}

// Analytics
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await Url.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = { handlegenerateNewShortUrl, handleGetAnalytics, }
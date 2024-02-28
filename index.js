const express = require('express');
const { connectToMongoDB } = require('./connect.js');
const { checkForAuthentication,restrictTo } = require('./middlewares/auth.middlewares.js');
const URL = require('./models/url.models.js');
const path = require('path');
const cookieParser = require('cookie-parser');

// Routes import
const urlRoute = require('./routes/url.routes');
const staticRoute =  require('./routes/staticRouter.routes.js');
const userRoute =  require('./routes/user.routes.js');

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => { console.log("MongoDB connected successfully") })
    .catch((error) => { console.log("MongoDB connection error: ", error) })

// EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))


// Middleware
app.use(express.json());   //to parse body
app.use(express.urlencoded({ extended: false })); // to parse form data
app.use(cookieParser());   //to parse cookie
app.use(checkForAuthentication);

// Routes
app.use('/url',restrictTo(["NORMAL"]),urlRoute);   // inline middleware, /url work only if user logged in
app.use('/', staticRoute);
app.use('/user', userRoute);

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    })
})

// dynamic route
app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })

    res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

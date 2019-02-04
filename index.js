const express = require("express");
const apiRoutes = require('./api_routes');
const renderRoutes = require('./routes/renderRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(expressValidator());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8080;
mongoose.connect(config.database);
const db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err);
});

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});



// Use API routes in the App
let users = require('./routes/user_routes');
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', renderRoutes);
app.use('/responses', renderRoutes);
app.use('/api', apiRoutes);
app.use('/users', users);

app.listen(port, function () {
    console.log('Running ResponseBuilder on port ' + port);
});
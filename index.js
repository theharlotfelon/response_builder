const express = require("express");
const apiRoutes = require('./api_routes');
const renderRoutes = require('./routes/renderRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

// Init App
const app = express();
let Response = require('./models/responseModel');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
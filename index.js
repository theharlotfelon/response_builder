const express = require("express");
const apiRoutes = require('./api_routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/ResponseBuilder');
const db = mongoose.connection;
const port = process.env.PORT || 8080;

// Message for Default URL
app.get('/', (req, res) => res.send('Hello World!!!'));
// Use API routes in the App
app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log('Running ResponseBuilder on port ' + port);
});
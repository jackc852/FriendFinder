var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var PORT = process.env.PORT || 3000;

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom ting into a Buffer
app.use(bodyParser.raw({ type: 'application/vmd.custom-type' }))

// parse HTML body into string
app.use(bodyParser.text({ type: 'text/html' }))

require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
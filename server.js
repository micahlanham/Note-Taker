//requiring npms and other files needed for this application
const express = require('express');
const fs = require('fs');
const path = require('path');



//adopting express and PORT
var app = express();
var PORT = process.env.PORT || 1000;

//linking public folder to attain data inside for this application
app.use(express.static('public'));

//setting up application parsing for my JSON files;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/htmlRoutes")(app,fs);
require("./routes/apiRoutes")(app,fs);




//listening to the Port so it will function like a live site
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
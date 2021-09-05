var path = require("path");

module.exports = function(app, fs){

    //Getting local host to load my index.html first
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Getting local host to send my notes.html file when called
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

}
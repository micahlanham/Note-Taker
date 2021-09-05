
var path = require("path");

module.exports = function(app, fs){

const db = require('../db/db.json');

let databaseFile = path.join(__dirname, '../db/db.json');

//API/Notes
app.get('/api/notes', function(req, res) {
    res.json(db);
});

// posting and creating user notes
app.post('/api/notes', function(req, res) {
    let newNote = req.body;  
    //establishing a user ID to make saving and deleting easier  
    let id = 1;

    for (let i = 0; i < db.length; i++) {
        let note = db[i];

        if (note.id > id) {
            id = note.id;
        }
    }

    //assinging the new note the newest ID
    newNote.id = id + 1;
    //pushing the new note into the DB. This will automatically show in the browser as well.
    db.push(newNote)
    //Letting user know in the console that the note saved properply
    fs.writeFile(databaseFile, JSON.stringify(db), function(err){
        if(err) {
            return console.log(err);
        }
        console.log("Note Saved");
    });
    res.json(newNote);

});

//deleting the chosen note based off ID
app.delete('/api/notes/:id', function(req, res) {
    let databaseFile = path.join(__dirname, '../db/db.json')
    //going through the db(database) to find the correct ID
    for(let i = 0; i < db.length; i++) {

        if(db[i].id == req.params.id) {
           
            //cutting out the note using the splice method
            db.splice(i, 1);            
            break;
        }
    }
    //writing int the console for the user to know the note deleted properly
    fs.writeFile(databaseFile, JSON.stringify(db), function(err) {

        if(err) {
            return console.log(err);
        } else {
            console.log("Note deleted");
        }
    });
    res.json(db);
});

}

// Dependencies
const express = require('express');
const path = require('path');
const app = express();
let db = require("./db/db.json")
const fs = require('fs');
const generateUniqueID = require("generate-unique-id");
const { fstat } = require('fs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Routes

//Takes the user to the "notes page"
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname+"/public", "notes.html"))
})
//hendles when the user adds a new note.  It is written into the database and the note is displayed in the note list
app.post("/api/notes", (req, res) => {
    let updatedNotes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data)
          req.body.id = generateUniqueID({length: 4})
          parsedNotes.push(req.body)
          updatedNotes = parsedNotes
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (err) =>
              err
                ? console.error(err)
                : console.info('Successfully updated Notes!')
          );
          console.log(updatedNotes)
          db = updatedNotes
          res.json(req.body)

        }
      }) 
})


//My best attempt at getting the delete buttons to work.  I'd love it if someone could show me what I did wrong.  It might have to do with using require instead of fs.readfile, but I tried that.  Anyways, it does delete the notes from the database, but it's not displayed until the server is killed and the program is run again
app.delete("/api/notes/:id", (req, res) =>{

    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if(err){
            console.log(err)
        }else{
            let parsedNotes = JSON.parse(data)
            console.log(req.params.id)
            for(let i = 0; i < parsedNotes.length; i++){
                let noteId = req.params.id
                if(req.params.id == parsedNotes[i].id){
                    parsedNotes.splice(i,1)
                    console.log("item deleted")
                    db = parsedNotes
                    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 4), (err) =>{
                        err ? console.log(err): console.info("successfully updated Notes!")
                    });
                    console.log(noteId)
                    //just the darndest
                    res.send(noteId)
                }
            }        
        }          
    })    
})
//gets the notes from the database and 
app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            console.log(data)
            res.send(data)
        }
      })
    
})
//a catch-all if the user types something after the base URL that doesn't have a corresponding route
app.get('*', (req, res) => res.sendFile(path.join(__dirname+"/public", 'index.html')))


app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
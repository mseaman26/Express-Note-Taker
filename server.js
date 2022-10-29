
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
    //notes file is read in
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          //file is parsed
          const parsedNotes = JSON.parse(data)
          //unique id generated
          req.body.id = generateUniqueID({length: 4})
          //new note added
          parsedNotes.push(req.body)
          updatedNotes = parsedNotes
          //file is re-written
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
          //note is returned in the response
          res.json(req.body)

        }
      }) 
})


//Got the delete buttons two work after much effort.  I had to modify the deleteNote function in index.js so that it RETURNED the fetch! 
app.delete("/api/notes/:id", (req, res) =>{
    //notes file is read in
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if(err){
            console.log(err)
        }else{
          //file is parsed
            let parsedNotes = JSON.parse(data)
            console.log(req.params.id)
            //looking for the note with the matching id so we can delete the right one
            for(let i = 0; i < parsedNotes.length; i++){
                let noteId = req.params.id
                if(req.params.id == parsedNotes[i].id){
                    //using the splice method to remove the note from the array
                    parsedNotes.splice(i,1)
                    console.log("item deleted")
                    db = parsedNotes
                    //re-writing the file
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
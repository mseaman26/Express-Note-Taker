
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

const PORT = 3000;

// Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname+"/public", "notes.html"))
})

app.post("/api/notes", (req, res) => {
    let updatedNotes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
          req.body.id = generateUniqueID({length: 4})
          parsedNotes.push(req.body);
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
          res.sendFile(path.join(__dirname+"/public", "api/notes.html"))
        }
      })
      
   
})

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname+"/public", 'index.html')))


app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
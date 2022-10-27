
// Dependencies
const express = require('express');
const path = require('path');
const app = express();
const db = require("./db/db.json")
const generateUniqueID = require("generate-unique-id")
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;



// Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname+"/public", "notes.html"))
})

app.post("/api/notes", (req, res) => {
    console.info(req.body);
    // res.json(db)
})

app.get("/api/notes", (req, res) => {
    res.json(db)
})



app.get('*', (req, res) => res.sendFile(path.join(__dirname+"/public", 'index.html')))













app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
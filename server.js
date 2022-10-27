
// Dependencies
const express = require('express');
const path = require('path');
const app = express();
const db = require("./Develop/db/db.json")

const PORT = 3000;



// Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname+"/Develop/public", "notes.html"))
})

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname+"/Develop/public", 'index.html')))














app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
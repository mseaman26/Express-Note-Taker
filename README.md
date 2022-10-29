# Express Note Taker
  ## Description

    This app allows the user to write and store notes.  As many notes can be stored as the user wants.  Each note has a title, a body, and a unique ID for data storage and deleting purposes.  If the user clicks the red button next to one of their stored notes, that note is deleted

  [![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

  ##  Link to the Deployed Application:
  https://mikes-express-note-taker.herokuapp.com/

  ## Demo of the Application on Heroku
   <img src="Assets/Note Taker.gif">

  ## Table of Contents

 
  * [Technologies Used](#technologies-used)
  * [Notable Methods](#notable-methods)
  * [Code Snippets](#code-snippets)
  * [Installation](#installation)<br />
  * [Usage](#usage)<br />
  * [Contributing to This Repository](#how-to-contribute-to-this-repository)<br />
  * [Tests](#to-run-tests-run-the-following-command)<br />
  * [Questions](#questions)<br />

  ## Technologies Used
  - Javascript
  - Node.JS
  - Express.JS
  - Generate-Unique-Id npm package

  ## Notable Methods
  - Using server-side code with Express.JS
  - writing multiple routes in the server to handle different user activity
  - Connecting server-side code with front end code

  ## Code Snippets
  Here is the rouse to handle post requests when the user adds a new note:
  ```javascript
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

```
Here is the delte route.  The hardest part of the project:
```javascript
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
```
 ## Installation

    To install the necessary dependancies, run the following command:

      npm install

  ## Usage

    Clone it into a local directory, install,  and run the server.js file in node and open the link displayed in the terminal
    
  ## How to Contribute to This Repository:

    Contact me via email (see below)
    
  ## To run tests, run the following command:

    no tests required

    
  ## Questions
  If you have any questions about this project, feel free to reach out to me at:
  <a href="MSeaman26@gmail.com">MSeaman26@gmail.com</a>.  
  To see more of my work, please visit:
  <a href="https://github.com/MSeaman26">My Github Page</a>




//Load express module
const express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    faker = require('faker');
    
    
app.use(bodyParser.json());

//Define request response in root URL (/)
app.get('/', (req, res)=> {
  res.send('App running successfully!');
})

// Create a basic get API with some response...
app.get('/post-list', (req,res)=>{
    res.json({
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    })
    
})

// Dummy post API....
app.post('/submit-data', (req,res)=>{
    console.log(req.body,'body data----');
    if(!req.body.name || !req.body.email){
        res.json({
            message : "Mendatory params are missing!"
        })
    }
    else{
        res.json({
            message : "data saved successfully"
        })
    }
})

//Launch listening server on port 8080
app.listen(4000, ()=> {
  console.log('App listening on port 4000!')
})
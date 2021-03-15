const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");
const app = express();
const posts = require("./posts.json");




function postName(data) {
    data.id = posts.length+1
    posts.push(data);

fs.writeFile("posts.json", JSON.stringify(posts), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log("Done writing"); // Success 
}); 
}

function sortPosts(arg) {
    const arr = []
    if(arg) {
    posts.forEach( post => {
        arr[post.id-1] = post
    })
} else {
    posts.forEach( post => {
        arr[posts.length-post.id] = post
}) }
    return arr
}

function findById(id) {
    return posts.find(post => post.id === id)
}

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => {
console.log("get working")
// res.status(200).send(posts)
if(req.query.sort) { 
    res.status(200).send(sortPosts(true))
}else {
  res.status(200).send(sortPosts(false))
}

})

app.post('/', (req,res) => {
    postName(req.body)
    res.status(201).send("post added")
})

app.delete('/:id' , (req,res) => {
    const id = parseInt(req.params.id)
    const arr =posts.filter(post => !(post.id === id))
    console.log(arr)
    res.status(204).send("deleted!")
    
})

app.patch('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const post = findById(id);
    post.comments.push(req.body.comment)
    console.log(post)
    fs.writeFile("posts.json", JSON.stringify(posts), err => { 
     
        // Checking for errors 
        if (err) throw err;  
       
        console.log("Done writing"); // Success 
    }); 
    res.status(201).send(posts)  
})

app.patch('/:id/:emoji', (req,res) => {
    const id = parseInt(req.params.id)
    const post = findById(id);
    const emoji = req.params.emoji
    post.reactions[emoji]++
    console.log(post)
    fs.writeFile("posts.json", JSON.stringify(posts), err => { 
     
        // Checking for errors 
        if (err) throw err;  
       
        console.log("Done writing"); // Success 
    }); 
    res.status(201).send(posts)  
})

module.exports = app;

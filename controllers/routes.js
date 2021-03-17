const express = require('express');
const router = express.Router();
const Post = require('../models/post')

router.get('/', (req, res) => {
    if(req.query.sort) { res.send(Post.sortPost()) }
    res.status(200).send(Post.all);
});

router.post('/', (req,res) => {
    Post.createPost(req.body)
    res.status(201).send(Post.all[Post.all.length - 1])
    
})

router.patch('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const comment = req.body.comment
    Post.addComment(id, comment)
    res.status(201).send("updated!")
})

router.patch('/:id/:emoji', (req,res) => {
    const id = parseInt(req.params.id)
    const emoji = req.params.emoji
    Post.addEmoji(id,emoji)
    res.status(201).send("added emoji")  
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Post.deletePost(id)
    res.send("deleted") 
    
})

module.exports = router;
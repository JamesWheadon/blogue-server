const express = require('express');
const router = express.Router();
const Post = require('../models/post')

router.get('/', (req, res) => {
    if(req.query.sort) res.send(Post.sortPost())
    res.status(200).send(Post.all);
});

router.post('/', (req,res) => {
    Post.createPost(req.body)
    .then( () => res.status(201).send("post added"))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Post.deletePost(id)
    .then( () => {
    res.status(204)
    res.send("deleted!")
    })
})

module.exports = router;
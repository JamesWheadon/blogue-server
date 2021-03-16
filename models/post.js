const postsData = require('../posts.json');
const fs = require("fs");


class Post {
    constructor({id, subject, journalInput, gif, date,  comments=[], reactions={"emoji1":0,"emoji2":0,"emoji3":0} }) {
        this.id = id,
        this.subject = subject,
        this.journalInput =journalInput,
        this.gif = gif,
        this.date = date,
        this.comments = comments,
        this.reactions = reactions
    }

    static get all() {
        const posts = postsData.map(post => new Post(post));
        return posts;
    }

    static findByID(id) {
        try {
            const post = postsData.find(post => post.id === id)
            return post;
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    static sortPost() {
        const arr = []
        Post.all.forEach( post => { arr[postsData.length-post.id] = post })
        return arr
    }

    static createPost(data) {
        let maxId = 0;
        Post.all().forEach( post => {
            if (post.id > maxId)  {
                maxId = post.id
            }
        })
        data.id = maxId + 1;
        postsData.push(data);
        fs.writeFile("../posts.json", JSON.stringify(postsData), err => {
            // Checking for errors 
            if (err) throw err;  

            console.log("Done adding comment"); // Success 
         })
    }

    static  addComment(id, comment) {
        const post = this.findByID(id);
        post.comments.push(comment)
        console.log(postsData)
        fs.writeFile("./posts.json", JSON.stringify(postsData), err => { 
            // Checking for errors 
            if (err) throw err;  

            console.log("Done adding comment"); // Success 
         })
    }

    static createPost(data) {
        data.id = postsData.length+1
        postsData.push(data);
        fs.writeFile("./posts.json", JSON.stringify(postsData), err => { 
            // Checking for errors 
            if (err) throw err;  

            console.log("Done writing"); // Success 
         })
    }

    static addEmoji(id, e) {
        const post = this.findByID(id);
        const emoji = e;
        post.reactions[emoji]++
        fs.writeFile("./posts.json", JSON.stringify(postsData), err => { 
            // Checking for errors 
            if (err) throw err;  

            console.log("Done adding comment"); // Success 
         })
    }

    static deletePost(id) {
        let index = (postsData.findIndex( post => post.id === id))
        postsData.splice(index,1)
        fs.writeFile("./posts.json", JSON.stringify(postsData), err => { 
            // Checking for errors 
            if (err) throw err;  
            console.log("Done deleting post")
         })  
    }

    static sortPosts(array, comparison) {
        // array is the array to sort
        // comparison = 0 for ascending ids, 1 for descending ids, 2 for descending most comments/reactions total
        if (array.length > 1){
            let previous = []
            let following = []
            let pivot = array[array.length - 1];
            for(let i = 0; i < array.length - 1; i++) {
                post = array[i];
                if (comparison === 0 && post.id < pivot.id) {
                    previous.push(post)
                } else if (comparison === 1 && post.id > pivot.id) {
                    previous.push(post)
                } else if (comparison === 2) {
                    if (post.comments.length + Object.values(post.reactions).reduce((a, b) => a + b, 0) > pivot.comments.length + Object.values(pivot.reactions).reduce((a, b) => a + b, 0)) {
                        previous.push(post)
                    }
                    else {
                        following.push(post)
                    }
                } else {
                    following.push(post)
                }
            }
            return sortPosts(previous, comparison).concat([pivot]).concat(sortPosts(following, comparison))
        }
        else {
            return array;
        }
    }

}


module.exports = Post;

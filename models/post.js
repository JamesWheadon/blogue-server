const postsData = require('../posts.json');
const fs = require("fs");




class Post {
    constructor({id, title, comments=[], reactions={} }) {
        this.id = id,
        this.title = title,
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
        const newPostsData = postsData.filter(post => !(post.id === id))
        console.log(newPostsData)
        fs.writeFile("./posts.json", JSON.stringify(newPostsData), err => { 
            // Checking for errors 
            if (err) throw err;  
            console.log("Done deleting post66")
            
         })  
         return postsData
    }
  

}


module.exports = Post;
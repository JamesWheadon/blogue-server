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
            const Data = postsData.find(post => post.id === id);
            const post = new Post(Data);
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

    static async createPost(data) {
        data.id = postsData.length+1
        postsData.push(data);
        await fs.writeFile("../posts.json", JSON.stringify(postsData), err => { 
            // Checking for errors 
            if (err) throw err;  

            console.log("Done writing"); // Success 
         })
         return Post.all
    }

    static addComment(id, comment) {
        const post = this.findByID(id);
        post.comments.push(comment)
        fs.writeFile("../posts.json", JSON.stringify(postsData), err => { 
            // Checking for errors 
            if (err) throw err;  

            console.log("Done adding comment"); // Success 
         })
    }

    static addEmoji(id, e) {
        const post = this.findByID(id);
        const emoji = e;
        post.reactions[emoji]++
        fs.writeFile("../posts.json", JSON.stringify(postsData), err => { 
            // Checking for errors 
            if (err) throw err;  

            console.log("Done adding comment"); // Success 
         })
    }

    static async deletePost(id) {
        const newPostsData = postsData.filter(post => !(post.id === id))
        await fs.writeFile("../posts.json", JSON.stringify(newPostsData), err => { 
            // Checking for errors 
            if (err) throw err;  

            console.log("Done deleting post"); // Success 
         })
        
        return Post.all
    }

}





module.exports = Post;
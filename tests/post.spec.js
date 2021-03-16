const Post = require('../models/post')

describe('API server', () => {

    it('all() returns an array', () => {
        const result = Post.all;
        expect(typeof(result)).toEqual("object");
    })
})
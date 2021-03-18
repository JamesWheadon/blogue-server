const request = require("supertest");
const server = require('../app');

describe('API server', () => {
    let api
    let newComment = {
        comment: "Wow yeah I agree"
    };
    let newPost = {
        subject: "Aldi"
    }

    beforeAll(() => {
        api = server.listen(5000, () => console.log('Test server running on port 5000'))
    })

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('it responds to get / with status 200', done => {
        request(api)
        .get('/')
        .expect(200, done);
    })

    it('it responds to get /search?search=returnnothingok with status 200', done => {
        request(api)
        .get('/search?search=returnnothingok')
        .expect(200)
        .expect([] ,done);
    })

    it('it responds to get /?sort=0 with status 200', done => {
        request(api)
        .get('/?sort=0')
        .expect(200, done);
    })

    it('it responds to get /?sort=1 with status 200', done => {
        request(api)
        .get('/?sort=1')
        .expect(200, done);
    })

    it('it responds to get /?sort=2 with status 200', done => {
        request(api)
        .get('/?sort=2')
        .expect(200, done);
    })

    it('it responds to post / with status 201', done => {
        request(api)
        .post('/')
        .send(newPost)
        .expect(201, done);
    })

    it('it responds to delete /1 with status 200', done => {
        request(api)
        .delete('/1')
        .expect(204, done);
    })

    it('it responds to patch /1 with status 201', done => {
        request(api)
        .patch('/1')
        .send(newComment)
        .expect(201, done);
    })

    it('it responds to patch /1/emoji1 with status 201', done => {
        request(api)
        .patch('/1/emoji1')
        .send(newComment)
        .expect(201, done);
    })
})
const request = require("supertest");
const server = require('../app');

describe('API server', () => {
    let api

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

    it('it responds to delete /1 with status 200', done => {
        request(api)
        .delete('/1')
        .expect(204, done);
    })
})
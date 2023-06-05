const { describe, it } = require('mocha');
const supertest = require('supertest')
const assert = require('assert')

describe('API Suite Test', () => {
    let app;
    before((done) => {
        app = require('./api')
        app.once('listening', done)
    })

    after(done => app.close(done))

    describe('/contact:get', () => {
        it('Should request the contact page and return HTTP Status 200', async () => {
            const response = await supertest(app)
                .get("/contact")
                .expect(200)

            assert.strictEqual(response.text, 'Contact us page')        
        })
    })

    describe('/login:post', () => {
        it('Should request the login and return HTTP Status 200', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({username: 'rafhaelmallorga', password: '123'})
                .expect(200)

            assert.strictEqual(response.text, 'Log in succeeded!')
        })
        it('Should request the login and return HTTP Status 401', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({username: 'xuxa', password: '123'})
                .expect(401)

            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, 'Log in failed!')
        })
    })
    describe('/default:get', () => {
        it('Should test the default return and HTTP Status 404', async () => {
            const response = await supertest(app)
                .get('/anything')
                .expect(404)

            assert.strictEqual(response.text, 'Not found!')
        })
    })
})
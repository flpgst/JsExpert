const {describe, it} = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

const DEFAULT_USER = { username: 'flpgst', password: '123'}

describe('API suite test', () => {
    describe('/contact', () => {
        it('should request contact page and return status 200', async () => {
            const response = await request(app).get('/contact').expect(200)
            assert.deepStrictEqual(response.text, 'entre em contato')
        })
    })

    describe('/hello', () => {
        it('should request a non-existent route and redirect to default', async() => {
            const response = await request(app)
            .get('/not-found')
            .expect(200)

            assert.deepStrictEqual(response.text, 'Helloo')
        } )
    })

    describe('/login', () => {
        it('should loggin successfuly on login route', async() => {
            const response = await request(app)
            .post('/login')
            .send(DEFAULT_USER)
            .expect(200)

            assert.deepStrictEqual(response.text, 'Logged in')
        })
        it('should unauthorize on bad cerdencials on login route', async() => {
            const response = await request(app)
            .post('/login')
            .send({...DEFAULT_USER, password: "3232423"})
            .expect(401)

            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Not Authorized')
        })

    })
})
const request = require('supertest');

const app = require('../app');

describe('Autorizar Controller', () => {

    test('The length of the password must have at least 8 letters', async () => {
        const res = await request(app)
            .post('/autorizar/loguear')
            .send({
                password : '123456',
                mail1 : 'tesorotomas2010@gmail.com'
            });
        expect(res.statusCode).toEqual(412);
    }),

    test('It must not log an unexisting user', async () => {
        const res = await request(app)
            .post('/autorizar/loguear')
            .send({
                password : 'bols1alarge2010',
                mail1 : 'tesorotomas2010@gmail.com'
            });
        expect(res.statusCode).toEqual(401);
    })

});
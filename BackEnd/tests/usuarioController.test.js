const request = require('supertest');

const app = require('../app');

describe('Autorizar Controller', () => {

  let token;

  beforeAll((done) => {
      request(app)
      .post('/autorizar/loguear')
      .send({
          password : "tesoro202015",
          mail1: "tesoro2010@hotmail.com"
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      })
  }),

  test('It should throw an exception because the user already exists', async () => {
    const res = await request(app)
      .post('/usuario/crear')
      .send({
          codigo : "TESORO2010",
          origen : "P",
          nombre1 : "Tomás",
          apellido1 : "Rivera",
          apellido2 : "Záarate",
          identificacion : "1750502047",
          tipo_identificacion : "C",
          direccion_calle1 : "Av. Real Audiencia",
          direccion_num : "E3-53",
          direccion_calle2 : "De los Ciruelos",
          telefono1 : "0995951346",
          password : "tesoro202015",
          mail1: "tesoro2010@hotmail.com",
          estado : "A",
          fecha_caducidad : "2110-09-16"
      });
    expect(res.statusCode).toEqual(500);
  })

  // Enable just in case of wanting to create a new user, but first erase from the DB
  // but it works, it was tested
  // test('It should create a new user', async () => {
  //   const res = await request(app)
  //     .post('/usuario/crear')
  //     .send({
  //       codigo : "BIZCOCHO2019",
  //       origen : "G",
  //       nombre1 : "Sara",
  //       nombre2 : "Luciana",
  //       apellido1 : "Rivera",
  //       apellido2 : "Zárate",
  //       identificacion : "1759995333",
  //       tipo_identificacion : "C",
  //       direccion_calle1 : "Av. Real Audiencia",
  //       direccion_num : "E3-53",
  //       direccion_calle2 : "De los Ciruelos",
  //       telefono1 : "0995951347",
  //       password : "bizcochazo2019",
  //       mail1: "bizcocho2019@hotmail.com",
  //       estado : "A",
  //       fecha_caducidad : "2119-12-16"
  //     });
  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty('user');
  // }),

  test('It should require authorization', async () => {
    await request(app)
      .get('/usuario/consultar')
      .then((response) => {
        expect(response.statusCode).toBe(401);
    });
  }),

  test('It should throw error for invalid token', async () => {
    return await request(app)
      .get('/usuario/consultar')
      .set('Authorization', 'xyz')
      .then((response) => {
        expect(response.statusCode).toBe(500);
    });
  }),

  test('It should return all users', async () => {
    return await request(app)
      .get('/usuario/consultar')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('usuarios');
      });
  }),

  test('It should return a single user', async () => {
    return await request(app)
      .get('/usuario/consultar/1')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('user');
      });
  }),   

  test('It should return an exception, because user does not exist', async () => {
    return await request(app)
      .get('/usuario/consultar/777')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  }),

  test('It should update several fields of a specific user', async () => {
    const res = await request(app)
      .put('/usuario/actualizar1/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origen : "F",
        nombre1 : "Tomás",
        nombre2 : "Emilio",
        apellido2 : "Zárate"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  })

  test('It should throw an exception because user does not exist', async () => {
    const res = await request(app)
      .put('/usuario/actualizar1/777')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origen : "F",
        nombre1 : "Tomas",
        nombre2 : "Emilio",
        apellido2 : "Zarate"
      });
    expect(res.statusCode).toEqual(412);
  })

  test('It should delete a specific user', async () => {
    const res = await request(app)
      .delete('/usuario/eliminar/39')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  })

  test('It should throw an exception because user does not exist', async () => {
    const res = await request(app)
      .delete('/usuario/eliminar/777')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(500);
  })

});
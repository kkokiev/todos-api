const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { User } = require('../models/user');
const { users, populateUsers } = require('./seed/seed'); 

beforeEach(populateUsers);

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    const email = 'newmail@example.com';
    const password = '123mnb!';

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then((user) => {
          expect(user).toBeTruthy();
          expect(user.passord).not.toBe(password);
          done();
        })
        .catch((err) => done(err));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({})
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    const email = users[0].email;
    const password = '123mnb!';

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then((user) => { 
            expect(user.tokens[1]).toHaveProperty('access', 'auth');
            expect(user.tokens[1]).toHaveProperty('token', res.headers['x-auth']);
            done();
          })
          .catch((err) => done(err));
      });

  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: 'invalidpass'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then((user) => { 
            expect(user.tokens.length).toBe(1);
            done();
          })
          .catch((err) => done(err));
      });
  });
});

describe('DELETE /users/logout', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/logout')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        })
        .catch((err) => done(err));
      });
  });
});

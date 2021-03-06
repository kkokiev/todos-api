const express = require('express');
const _ = require('lodash');

const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      return res.header('x-auth', token).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User
    .findByCredentials(body.email, body.password)
    .then((user) => {
      user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch((err) => {
      res.status(400).send();
    });
});

router.delete('/users/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
});

module.exports = router;

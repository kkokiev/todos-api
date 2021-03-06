require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');

const todos = require('./routes/todos');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/', todos);
app.use('/', users);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app,
};

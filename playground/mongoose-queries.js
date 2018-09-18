const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');
const { ObjectID } = require('mongodb');

// const id = '5ba0b39fbe014b58df920753';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo
//   .find({
//     _id: id
//   })
//   .then((todos) => {
//     console.log('Todos', todos);
//   });

// Todo
//   .findOne({
//     _id: id
//   }).then((todo) => {
//     console.log('Todo', todo);
//   });

// Todo
//   .findById(id)
//   .then((todo) => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log('Todo by id', todo);
//   })
//   .catch((err) => console.log(err));

const userId = '5ba09c0b6d272149ffee4648';

User
  .findById(userId)
  .then((user) => {
    if (!user) {
      return console.log('User not found');
    }
    console.log('User by id', user);
  })
  .catch((err) => console.log(err));

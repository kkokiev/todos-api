const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');
const { ObjectID } = require('mongodb');

//Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove().then((result) => {
//   console.log(result);
// });

// Todo.findByIdAndRemove(id).then((doc) => {
//   console.log(doc);
// });

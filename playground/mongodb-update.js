const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  } 
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  db.collection('Todos').findOneAndUpdate({
    _id: ObjectID("5b9f87655c86d55fee34f416")
  }, {
    $set: {
      completed: true,
    }
  }, {
    returnOriginal: false,
  }).then((result) => {
    console.log(result);
  });

  // db.collection('Todos').findOneAndDelete({ _id: ObjectID("5b9f876f5c86d55fee34f41c") }).then((result) => {
  //   console.log(result);
  // });

  // client.close();
});
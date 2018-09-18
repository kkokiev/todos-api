const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  } 
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos')
  //   .find({
  //     _id: new ObjectID('5b9f5a7ff9f6d42bbe5502ca'),
  //   })
  //   .toArray()
  //   .then((docs) => {
  //     console.log('Tofos:')
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //     console.log('Unable to fetch data', err);
  //   });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({ name: 'Rena' }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });
  // client.close();
});
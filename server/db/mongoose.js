const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.set('useCreateIndex', true);

module.exports = {
  mongoose,
};

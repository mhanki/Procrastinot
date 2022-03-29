const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  /* password: {
    type: String,
    required: true,
    select: false
  }, */
  phone: {
    type: String
  },
  projects: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    }]
  }
});

usersSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', usersSchema);
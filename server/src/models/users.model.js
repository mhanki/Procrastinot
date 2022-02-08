const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  projects: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    required: true
  }
});

module.exports = mongoose.model('User', usersSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  projects: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
      }
    ],
    required: true
  }
});

module.exports = mongoose.model('User', usersSchema);
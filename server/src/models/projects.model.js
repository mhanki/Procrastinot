const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date_created: {
    type: Date,
    required: true
  },
  tags: [],
  tasks: [],
  members: []
})

module.exports = mongoose.model('Project', projectsSchema);
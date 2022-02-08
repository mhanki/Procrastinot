const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  created_by: {
    type: Schema.Types.ObjectId,
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
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  values: {
    type: [{
      type: {
        name: {type: String, required: true},
        order: {type: Number, required: true},
        color: String
      },
      required: true,
    }],
    validate: {
      validator: v => v == null || v.length > 0,
      message: "Tag values are required"
    }
  }
});

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
  tags: [tagsSchema],
  tasks: [],
  members: []
});

module.exports = mongoose.model('Project', projectsSchema);
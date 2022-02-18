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

const tasksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assigned: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  date_created: {
    type: Date,
    required: true
  },
  tags: [{
    tag: { type: Schema.Types.ObjectId, required: true },
    value: { type: Schema.Types.ObjectId, required: true }
  }],
  comments: [{
    author: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, required: true },
    timestamp: {type: Date, required: true },
    text: {type: String, required: true}
  }]
})

const membersSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId,
    required: true
  },
  role: { 
    type: String, 
    required: true
  }
})

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
  tasks: [tasksSchema],
  members: {
    type: [membersSchema],
    validate: {
      validator: v => v == null || v.length > 0,
      message: "Project must have at least one member"
    }
  }
});

module.exports = mongoose.model('Project', projectsSchema);
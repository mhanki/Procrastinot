const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projects');

const comments = {
  getAll: catchAsync(async (req, res) => { 
    let { projectId, taskId } = req.params;

    let comments = await Project.findById(projectId)
      .then(data => data.tasks.find(({ _id }) => _id.equals(taskId)))
      .then(task => task.comments);

    res.send(comments);
  }),

  addComment: catchAsync(async (req, res) => { 
    let { projectId, taskId } = req.params;

    let project = await Project.findById(projectId);
    let task = await project.tasks.find(({ _id }) => _id.equals(taskId));

    let newComment = {
      author: req.user._id,
      date_created: Date.now(),
      text: req.body.text
    }

    task.comments.push(newComment);
    await project.save();

    res.send(newComment);
  })
}

module.exports = comments;
const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projects');

const tasks = {
  getById: catchAsync(async (req, res) => {
    let { projectId, id } = req.params;
    let task = await Project.findById(projectId)
      .then(data => data.tasks.find(({ _id }) => _id.equals(id)));

    res.send(task);
  }),

  getAll: catchAsync(async (req, res) => {
    let tasks = await Project.findById(req.params.projectId)
      .then(data => data.tasks);

    res.send(tasks);
  }),

  addTask: catchAsync(async (req, res) => {
    let project = await Project.findById(req.params.projectId);
    let task = {
      ...req.body,
      author: req.user._id,
      date_created: Date.now()
    };

    project.tasks = [...project.tasks, task];
    let savedProject = await project.save();

    res.send(savedProject.tasks);
  }),

  removeTask: catchAsync(async (req, res) => {
    let { projectId, id } = req.params;
    let project = await Project.findById(projectId);

    project.tasks = project.tasks.filter(({ _id }) => !_id.equals(id))
    let savedProject = await project.save();

    res.send(savedProject.tasks);
  }),

  /* TODO:
   * Refactor
  */
  updateTask: catchAsync(async (req, res) => {
    let { projectId, id } = req.params;
    let task = await Project.findById(projectId)
      .then(data => data.tasks.find(({ _id }) => _id.equals(id)));

    let updatedTask = {
      ...req.body,
      _id: task._id,
      author: task.author,
      created_by: task.created_by,
      comments: task.comments
    }

    await Project.findOneAndUpdate({"tasks._id": id}, {
      $set: { "tasks.$": updatedTask }
    });

    res.send(updatedTask);
  })
}

module.exports = tasks;
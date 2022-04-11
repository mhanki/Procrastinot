const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projects');

const tags = {
  addTag: catchAsync(async (req, res) => {
    let tag = req.body;
    let project = await Project.findById(req.params.projectId);
    project.tags = [...project.tags, tag];
    let savedProject = await project.save();
    res.send(savedProject.tags);
  }),

  getById: catchAsync(async (req, res) => {
    let { projectId, tagId } = req.params;
    let project = await Project.findById(projectId);
    let projectTags = project.tags;
    let tag = projectTags.find(({ _id }) => _id.equals(tagId));

    res.send(tag);
  }),

  getAll: catchAsync(async (req, res) => {
    let project = await Project.findById(req.params.projectId);
    let projectTags = project.tags;

    res.send(tags);
  }),

  removeTag: catchAsync(async (req, res) => {
    let { projectId, tagId } = req.params;
    let project = await Project.findById(projectId);
    project.tags = project.tags.filter(({ _id }) => !_id.equals(tagId));
    let savedProject = await project.save();
    res.send(savedProject.tags);
  }),

  updateTag: catchAsync(async (req, res) => {
    let tag = req.body;

    await Project.findOneAndUpdate({ "tags._id": tag._id }, {
      $set: { "tags.$": tag }
    });

    res.send(tag);
  })
}

module.exports = tags;
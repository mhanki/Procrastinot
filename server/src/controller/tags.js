const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projects');

const tags = {
  addTag: catchAsync(async (req, res) => {
    let project = await Project.findById(req.params.projectId);
    let tag = req.body;

    project.tags = [...project.tags, tag];
    let savedProject = await project.save();

    res.send(savedProject.tags);
  }),

  getById: catchAsync(async (req, res) => {
    let { projectId, id } = req.params;
    let tag = await Project.findById(projectId)
      .then(data => data.tags.find(({ _id }) => _id.equals(id)));

    res.send(tag);
  }),

  getAll: catchAsync(async (req, res) => {
    let tags = await Project.findById(req.params.projectId)
      .then(data => data.tags);

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
    let { projectId, id } = req.params;
    let { name, values } = req.body;
    let project = await Project.findById(projectId);
    let tag = project.tags.find(({ _id }) => _id.equals(id));

    let updatedTag = {
      _id: tag._id,
      name: name ? name : tag.name,
      values: values ? values : tag.values
    }

    await Project.findOneAndUpdate({ "tags._id": id }, {
      $set: { "tags.$": updatedTag }
    });

    res.send(updatedTag);
  })
}

module.exports = tags;
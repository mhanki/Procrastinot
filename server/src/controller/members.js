const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projects');

const members = {
  addMember: catchAsync(async (req, res) => {
    let member = req.body;
    let project = await Project.findById(req.params.projectId);

    project.members = [...project.members, member];
    let savedProject = await project.save();

    res.send(savedProject.members);
  }),

  getById: catchAsync(async (req, res) => {
    let { projectId, id } = req.params;

    let member = await Project.findById(projectId)
      .then(data => data.members.find(({ _id }) => _id.equals(id)))

    res.send(member);
  }),

  getAll: catchAsync(async (req, res) => {
    let members = await Project.findById(req.params.projectId)
      .then(data => data.members);

    res.send(members);
  }),

  removeMember: catchAsync(async (req, res) => {
    let { projectId, id } = req.params;

    let project = await Project.findById(projectId);
    project.members = project.members.filter(({ _id }) => !_id.equals(id));

    let savedProject = await project.save();
    res.send(savedProject.members);
  }),

  updateRole: catchAsync(async (req, res) => {
    let { projectId, id } = req.params;
    let { role } = req.body;
    let member = await Project.findById(projectId)
      .then(data => data.members.find(({ _id }) => _id.equals(id)));
    
    let updatedMember = { 
      _id: member._id,
      user_id: member.user_id,
      role: role
    }

    await Project.findOneAndUpdate({ "members._id": id }, {
      $set: { "members.$": updatedMember }
    });

    res.send(updatedMember);
  })
}

module.exports = members;
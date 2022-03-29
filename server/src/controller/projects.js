const catchAsync = require('../utils/catchAsync');
const Project = require('../models/projects');
const User = require('../models/users');

const getAllByUser = catchAsync(async (req, res) => {
  let user = await User.findById(req.user._id).populate('projects');
  res.send(user.projects);
})

const getById = async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.send(project);
}

const createProject = catchAsync(async (req, res) => {
  const projectInfo = req.body;
  const created_by = req.user._id;
  const date_created = Date.now();
  const members = projectInfo.members != null
    ? members
    : { user_id: created_by, role: 'admin' }

  const project = new Project({
    ...projectInfo,
    created_by,
    date_created,
    members
  })

  let user = await User.findById(req.user._id)
  let savedProject = await project.save();

  user.projects = [...user.projects, savedProject._id];
  await user.save();

  res.send(savedProject);
})

const deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if(project == null) { 
    return res.send('Project not found')
  }

  let hasAdminRights = project.members.filter(({user_id}) => user_id.equals(req.user._id)).length > 0;
  if(!hasAdminRights) {
    return res.send('Error: No admin rights');
  }

  let deletedProject = await Project.findOneAndDelete({_id: req.params.id});
  deletedProject.members.forEach(async ({ user_id }) => {
    let user = await User.findById(user_id);
    let updatedProjects = user.projects.filter(project => !project.equals(deletedProject._id));
    user.projects = updatedProjects;
    await user.save();
  })

  res.send(deletedProject);
})

module.exports = { getAllByUser, getById, createProject, deleteProject }
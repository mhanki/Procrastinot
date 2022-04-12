const Project = require('../models/projects');

const registerUser = async (request, user) => {
  await request.post('/signup').send(user);
};

const createProject = async (request, project) => {
  await request.post('/projects').send(project);
};

const getProjectId = async () => {
  let id = await Project.find()
    .then(data => data[0]._id)

  return id;
};

const addTask = async (request, projectId, task) => {
  await request
    .post(`/tasks/${projectId}`)
    .send(task);
}

const getSubdocId = async (projectId, fieldName) => (
  await Project.findById(projectId)
    .then(data => data[fieldName][0]._id)
)

const isJSON = async (res) => {
  expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
  expect(200);
}

module.exports = { 
  registerUser,
  createProject,
  getProjectId,
  addTask,
  getSubdocId,
  isJSON,
}
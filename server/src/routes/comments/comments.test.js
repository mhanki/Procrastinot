const supertest = require('supertest');
const app = require('../../app');
const Project = require('../../models/projects');
const { mongoConnect, mongoDisconnect, cleanDatabase } = require('../../services/mongo');

const request = supertest.agent(app);

const user1 = {
  name: "Michael Scott",
  email: "michael@dundermiff.com",
  password: "123"
};

const project = {
  title: "Selenite",
  description: "A minimalistic Spotify player"
};

let projectId;

async function _registerUser() {
  await request.post('/signup').send(user1);
};

async function _createProject() {
  await request.post('/projects').send(project);
};

async function _addTask() {
  await request.post(`/tasks/${projectId}`).send({
    title: "Another important task",
    description: "Do this thing"
  })
}

async function _getProjectId() {
  let projects = await request.get('/projects');
  return projects.body[0]._id;
};

beforeAll(async () => {
  try {
    await mongoConnect();
    await cleanDatabase();
    await _registerUser();
    await _createProject();
    projectId = await _getProjectId();
    await _addTask();
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await mongoDisconnect();
});

describe('POST /comments/:projectId/:taskId', () => {
  it('responds with a json object', async () => {
    let taskId = await Project.findById(projectId)
      .then(data => data.tasks[0]._id)
    let comment = { text: "I'm on it!" };
    let res = await request.post(`/comments/${projectId}/${taskId}`).send(comment);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  })
});

describe('GET /comments/:projectId/:taskId', () => {
  it('responds with a json object', async () => {
    let taskId = await Project.findById(projectId)
      .then(data => data.tasks[0]._id);

    let res = await request.get(`/tasks/${projectId}/${taskId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});
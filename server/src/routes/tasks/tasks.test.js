const supertest = require('supertest');
const app = require('../../app');
const User = require('../../models/users');
const Project = require('../../models/projects');
const { mongoConnect, mongoDisconnect, cleanDatabase } = require('../../services/mongo');

const request = supertest.agent(app);

const user1 = {
  name: "Michael Scott",
  email: "michael@dundermiff.com",
  password: "123"
};

const user2 = {
  name: "Dwight Schrute",
  email: "dwight@dschrutefarms.com",
  password: "mose"
};

const project = {
  title: "Selenite",
  description: "A minimalistic Spotify player",
  tags: [
    { name: "status", values: [{ name: "open", order: 1, color: "blue" }] },
    { name: "type", values: [{ name: "design", order: 1, color: "purple" }] }
  ]
};

const task = {
  title: "Another important task",
  description: "Do this thing"
}

let projectId;

async function _registerUser() {
  await request.post('/signup').send(user2);
  await request.post('/signup').send(user1);
};

async function _createProject() {
  await request.post('/projects').send(project);
};

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
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await mongoDisconnect();
});

describe('POST /tasks/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request.post(`/tasks/${projectId}`).send(task);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  })
});

describe('GET /tasks/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request.get(`/tasks/${projectId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('GET /tasks/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let taskId = await Project.findById(projectId).then(data => data.tasks[0]._id);

    let res = await request.get(`/tasks/${projectId}/${taskId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('PUT /tasks/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let taskId = await Project.findById(projectId).then(data => data.tasks[0]._id)

    let updatedInfo = {
      ...task,
      description: "Do this very important thing"
    };

    let res = await request.put(`/tasks/${projectId}/${taskId}`).send(updatedInfo);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('DELETE /tasks/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let taskId = await Project.findById(projectId).then(data => data.tasks[0]._id);

    let res = await request.delete(`/tasks/${projectId}/${taskId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});
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
  description: "A minimalistic Spotify player"
};

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

describe('POST /members/:projectId', () => {
  it('responds with a json object', async () => {
    let user_id = await User.findOne({ email: user2.email }).then(data => data._id);
    let member = { user_id, role: 'developer' }

    let res = await request.post(`/members/${projectId}`).send(member);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  })
});

describe('GET /members/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request.get(`/members/${projectId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('GET /members/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let memberId = await Project.findById(projectId).then(data => data.members[0]._id);

    let res = await request.get(`/members/${projectId}/${memberId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('PUT /members/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let memberId = await Project.findById(projectId).then(data => data.members[1]._id)

    let updatedRole = {
      role: 'admin'
    };

    let res = await request.put(`/members/${projectId}/${memberId}`).send(updatedRole);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('DELETE /members/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let memberId = await Project.findById(projectId).then(data => data.members[0]._id);

    let res = await request.delete(`/members/${projectId}/${memberId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});
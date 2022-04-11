const supertest = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect, cleanDatabase } = require('../../services/mongo');

const request = supertest.agent(app);

const user = {
  name: "Michael Scott",
  email: "michael@dundermiff.com",
  password: "123"
};

const project = {
  title: "Selenite",
  description: "A minimalistic Spotify player"
};

const tag = {
  name: "Status",
  values: [
    { name: "open", order: 1, color: "blue" },
    { name: "in progress", order: 2, color: "orange" },
    { name: "closed", order: 3, color: "green" }
  ]
};

let projectId;

async function _registerUser() {
  await request.post('/signup').send(user);
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

describe('POST /tags/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request.post(`/tags/${projectId}`).send(tag);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  })
});

describe('GET /tags/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request.get(`/tags/${projectId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('GET /tags/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let project = await request.get(`/projects/${projectId}`).then(res => res.body);
    let tagId = project.tags[0]._id;

    let res = await request.get(`/tags/${projectId}/${tagId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('PUT /tags/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let project = await request.get(`/projects/${projectId}`).then(res => res.body);
    let oldTag = project.tags[0];
    let valIds = oldTag.values.map(val => val._id);
    let newTag = {
      _id: oldTag._id,
      name: "Status",
      values: [
        { _id: valIds[0], name: "open", order: 1, color: "blue" },
        { _id: valIds[1], name: "in progress", order: 2, color: "orange" },
        { _id: valIds[2], name: "done", order: 3, color: "green" }
      ]
    };

    let res = await request.put(`/tags/${projectId}/${tag._id}`).send(newTag);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('DELETE /tags/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let project = await request.get(`/projects/${projectId}`).then(res => res.body);
    let tagId = project.tags[0]._id;

    let res = await request.delete(`/tags/${projectId}/${tagId}`);

    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});
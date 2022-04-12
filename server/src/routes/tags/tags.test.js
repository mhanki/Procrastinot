const supertest = require('supertest');
const app = require('../../app');
const Project = require('../../models/projects');
const { registerUser, createProject, getProjectId, getSubdocId, isJSON } = require('../../utils/testHelper');
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

beforeAll(async () => {
  try {
    await mongoConnect();
    await cleanDatabase();
    await registerUser(request, user);
    await createProject(request, project);
    projectId = await getProjectId();
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await mongoDisconnect();
});

describe('POST /tags/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request
      .post(`/tags/${projectId}`)
      .send(tag);

    isJSON(res);
  })
});

describe('GET /tags/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request
      .get(`/tags/${projectId}`);

    isJSON(res);
  });
});

describe('GET /tags/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let tagId = await getSubdocId(projectId, "tags");

    let res = await request
      .get(`/tags/${projectId}/${tagId}`);

    isJSON(res);
  });
});

describe('PUT /tags/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let tagId = await getSubdocId(projectId, "tags");
    let tag = await Project.findById(projectId)
      .then(data => data.tags.find(({ _id }) => _id.equals(tagId)));
    let valIds = tag.values.map(val => val._id);

    let newInfo = {
      values: [
        { _id: valIds[0], name: "open", order: 1, color: "blue" },
        { _id: valIds[1], name: "in progress", order: 2, color: "orange" },
        { _id: valIds[2], name: "done", order: 3, color: "green" }
      ]
    };

    let res = await request
      .put(`/tags/${projectId}/${tagId}`)
      .send(newInfo);

    isJSON(res);
  });
});

describe('DELETE /tags/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let tagId = await getSubdocId(projectId, "tags")

    let res = await request.delete(`/tags/${projectId}/${tagId}`);

    isJSON(res);
  });
});
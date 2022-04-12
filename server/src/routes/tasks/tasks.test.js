const supertest = require('supertest');
const app = require('../../app');
const Project = require('../../models/projects');
const { registerUser, createProject, getProjectId, getSubdocId, isJSON } = require('../../utils/testHelper');
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

beforeAll(async () => {
  try {
    await mongoConnect();
    await cleanDatabase();
    await registerUser(request, user2);
    await registerUser(request, user1);
    await createProject(request, project);
    projectId = await getProjectId();
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await mongoDisconnect();
});

describe('POST /tasks/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request
      .post(`/tasks/${projectId}`)
      .send(task);

    isJSON(res);
  })
});

describe('GET /tasks/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request
      .get(`/tasks/${projectId}`);

    isJSON(res);
  });
});

describe('GET /tasks/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let taskId = await getSubdocId(projectId, "tasks");

    let res = await request
      .get(`/tasks/${projectId}/${taskId}`);

    isJSON(res);
  });
});

describe('PUT /tasks/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let taskId = await getSubdocId(projectId, "tasks");
    let updatedInfo = {
      ...task,
      description: "Do this very important thing"
    };

    let res = await request
      .put(`/tasks/${projectId}/${taskId}`)
      .send(updatedInfo);

    isJSON(res);
  });
});

describe('DELETE /tasks/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let taskId = await getSubdocId(projectId, "tasks");

    let res = await request
      .delete(`/tasks/${projectId}/${taskId}`);

    isJSON(res);
  });
});
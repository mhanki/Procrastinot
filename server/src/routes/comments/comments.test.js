const supertest = require('supertest');
const app = require('../../app');
const {
  registerUser,
  createProject,
  getProjectId,
  addTask,
  getSubdocId,
  isJSON
} = require('../../utils/testHelper');
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

const task = {
  title: "Another important task",
  description: "Do this thing"
}

let projectId;

beforeAll(async () => {
  try {
    await mongoConnect();
    await cleanDatabase();
    await registerUser(request, user);
    await createProject(request, project);
    projectId = await getProjectId();
    await addTask(request, projectId, task);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await mongoDisconnect();
});

describe('POST /comments/:projectId/:taskId', () => {
  it('responds with a json object', async () => {
    let taskId = await getSubdocId(projectId, "tasks");
    let comment = { text: "I'm on it!" };

    let res = await request
      .post(`/comments/${projectId}/${taskId}`)
      .send(comment);

    isJSON(res);
  })
});

describe('GET /comments/:projectId/:taskId', () => {
  it('responds with a json object', async () => {
    let taskId = await getSubdocId(projectId, "tasks");

    let res = await request.get(`/tasks/${projectId}/${taskId}`);

    isJSON(res);
  });
});
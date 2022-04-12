const supertest = require('supertest');
const app = require('../../app');
const { registerUser, createProject, getProjectId, isJSON } = require('../../utils/testHelper');
const { mongoConnect, mongoDisconnect, cleanDatabase } = require('../../services/mongo');

const request = supertest.agent(app)

let user = {
  name: "Michael Scott",
  email: "michael@dundermiff.com",
  password: "123"
}

let project = {
  title: "Selenite",
  description: "A minimalistic Spotify player"
}

let projectId;

beforeAll(async () => {
  try {
    await mongoConnect();
    await cleanDatabase();
    await registerUser(request, user);
    await createProject(request, project);
    projectId = await getProjectId();
  } catch (error) {
    console.log(error)
  }
})

afterAll(async () => {
  await mongoDisconnect();
})

describe('POST /projects', () => {
  it('responds with a json object', (done) => {
    request
      .post('/projects')
      .send(project)
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

describe('GET /projects', () => {
  it('responds with a json object', (done) => {
    request
      .get('/projects')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /projects/:id', () => {
  it('responds with a json object', async () => {
    let res = await request
      .get(`/projects/${projectId}`);

    isJSON(res);
  });
});

describe('PUT /projects/:id', () => {
  it('responds with a json object', async () => {
    let updatedInfo = { description: "A Minimalistic Spotify Player" }

    let res = await request.put(`/projects/${projectId}`)
      .send(updatedInfo);

    isJSON(res);
  })
});

describe('DELETE /projects/:id', () => {
  it('responds with a json object', async () => {
    let res = await request
      .delete(`/projects/${projectId}`);

    isJSON(res);
    expect(res.body._id).toEqual(projectId.toString());
  });
});
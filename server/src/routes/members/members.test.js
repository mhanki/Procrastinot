const supertest = require('supertest');
const app = require('../../app');
const User = require('../../models/users');
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
  description: "A minimalistic Spotify player"
};

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

describe('POST /members/:projectId', () => {
  it('responds with a json object', async () => {
    let user_id = await User.findOne({ email: user2.email }).then(data => data._id);
    let member = { user_id, role: 'developer' }

    let res = await request
      .post(`/members/${projectId}`)
      .send(member);

    isJSON(res);
  })
});

describe('GET /members/:projectId', () => {
  it('responds with a json object', async () => {
    let res = await request.get(`/members/${projectId}`);

    isJSON(res);
  });
});

describe('GET /members/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let memberId = await getSubdocId(projectId, "members");

    let res = await request.get(`/members/${projectId}/${memberId}`);

    isJSON(res);
  });
});

describe('PUT /members/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let memberId = await getSubdocId(projectId, "members");
    let updatedRole = { role: 'admin' };

    let res = await request
      .put(`/members/${projectId}/${memberId}`)
      .send(updatedRole);

    isJSON(res);
  });
});

describe('DELETE /members/:projectId/:id', () => {
  it('responds with a json object', async () => {
    let memberId = await getSubdocId(projectId, "members");

    let res = await request.delete(`/members/${projectId}/${memberId}`);

    isJSON(res);
  });
});
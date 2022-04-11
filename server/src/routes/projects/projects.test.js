const supertest = require('supertest');
const app = require('../../app');
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

async function _registerUser() {
  await request.post('/signup').send(user)
}

beforeAll(async () => {
  try{
    await mongoConnect();
    await cleanDatabase();
    await _registerUser();
  } catch(error){
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
    let projects = await request.get('/projects');
    let projectId = projects.body[0]._id;

    let res = await request.get(`/projects/${projectId}`);
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(200);
  });
});

describe('DELETE /projects/:id', () => {
  it('responds with a json object', async () => {
    let projects = await request.get('/projects');
    let projectId = projects.body[0]._id;

    let res = await request.delete(`/projects/${projectId}`);
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(res.body._id).toEqual(projectId);
    expect(200);
  });
});
const User = require('./users.model.js');

describe("Test User model", () => {
  const validUser = {
    name: "Michael Scott",
    email: "michael@dundermifflin.com",
    password: "turtle",
    phone: "123-456",
    projects: []
  }

  const removeProperty = (property) => {
    let u = {...validUser}
    delete u[property];
    return u
  }

  const checkForError = (user, property) => {
    let error = user.validateSync()
    expect(error.errors[property].message).toContain(`Path \`${property}\` is required.`)
  }
  
  it("should be invalid if name is missing", () => {
    let u = removeProperty("name")
    const user = new User(u);

    checkForError(user, "name")
  })

  it("should be invalid if email is missing", async () => {
    let u = removeProperty("email")
    const user = new User(u);

    checkForError(user, "email")
  })

  it("should be invalid if phone number is missing", async () => {
    let u = removeProperty("phone")
    const user = new User(u);

    checkForError(user, "phone")
  })

  it("should be invalid if password is missing", () => {
    let u = removeProperty("password")
    const user = new User(u);

    checkForError(user, "password")
  })

  it("should create empty projects array per default", () => {
    let u = removeProperty("projects")
    const user = new User(u);

    expect(u.projects).toBeUndefined();
    expect(user.projects).toEqual([]);
  })
  
})
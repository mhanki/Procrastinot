const Project = require('./projects.model');

// check that no extra properties are added

describe('Test Project model', () => {
  const validProject = {
    title: "Paper Mache",
    description: "♫ It is a mash... It is a paper mash! ♫",
    created_by: "id123",
    date_created: Date.now(),
    tags: [
      {
        name: "status",
        values: [
          { name: "open", value: 1, color: "gray" },
          { name: "in progress", value: 2, color: "blue" },
          { name: "closed", value: 3, color: "green" },
        ]
      },
    ],
    tasks: [
      {
        title: "Get glue",
        description: "Buy a lot of glue",
        author: "id123",
        assignees: ["id123"],
        date_created: Date.now(),
        tags: [{name: "status", value: "open"}],
        comments: [
          {
            author: "id124",
            timestamp: Date.now(),
            text: "I want to help, Michael!"
          }
        ]
      },
    ],
    members: [
      {
        user: "id123",
        role: "Admin"
      },
      {
        user: "id124",
        role: "Developer"
      }
    ]
  }

  const removeProperty = (property) => {
    let p = {...validProject}
    delete p[property];
    return p
  }

  const checkForError = (project, property) => {
    let error = project.validateSync()
    expect(error.errors[property].message).toContain(`Path \`${property}\` is required.`)
  }

  it('should be invalid if title is missing', () => {
    let p = removeProperty("title")
    let project = new Project(p)

    checkForError(project, "title")
  })

  it('should create empty string if description is missing', () => {
    let p = removeProperty("description")
    let project = new Project(p)

    expect(p.description).toBeUndefined()
    expect(project.description).toEqual("")
  })

  it('should be invalid if created date is missing', () => {
    let p = removeProperty("date_created")
    let project = new Project(p)

    checkForError(project, "date_created")
  })

  it('should be invalid if created by is missing', () => {
    let p = removeProperty("created_by")
    let project = new Project(p)

    checkForError(project, "created_by")
  })

  it('should create empty array if tasks is missing', () => {
    let p = removeProperty("tasks")
    let project = new Project(p)

    expect(p.tasks).toBeUndefined()
    expect(project.tasks).toEqual([])
  })

  it('should create empty array if members is missing', () => {
    let p = removeProperty("members")
    let project = new Project(p)

    expect(p.members).toBeUndefined()
    expect(project.members).toEqual([])
  })
})


describe('Tasks', () => {
  it("should contain titel", () => {

  })

  it("should contain description", () => {
    
  })

  it("should contain author", () => {
    
  })

  it("should contain assigned", () => {
    
  })

  it("should contain date created", () => {
    
  })

  it("should contain tags", () => {
    
  })

  it("should contain comments", () => {
    
  })
})


describe('Comments', () => {
  it("should contain author name", () => {
    
  })

  it("should contain User ref to author", () => {
    
  })

  it("should contain timestamp", () => {
    
  })

  it("should contain text", () => {
    
  })
})

describe('Members', () => {
  it("should contain Uer ref", () => {
    
  })

  it("should contain role", () => {
    
  })
})
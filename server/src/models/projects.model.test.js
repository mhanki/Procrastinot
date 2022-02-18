const Project = require('./projects.model');
const mongoose = require('mongoose');
const cloneDeep = require('lodash.clonedeep');

const mockAdminId = new mongoose.Types.ObjectId();
const mockUserId = new mongoose.Types.ObjectId();
const mockTagId = new mongoose.Types.ObjectId();
const mockTagValueId = new mongoose.Types.ObjectId();

const validProject = {
  title: "Paper Mache",
  description: "♫ It is a mash... It is a paper mash! ♫",
  created_by: mockAdminId,
  date_created: Date.now(),
  tags: [
    {
      _id: mockTagId,
      name: "status",
      values: [
        { _id: mockTagValueId, name: "open", order: 1, color: "gray" },
        { name: "in progress", order: 2, color: "blue" },
        { name: "closed", order: 3, color: "green" },
      ]
    },
  ],
  tasks: [
    {
      title: "Get glue",
      description: "Buy a lot of glue",
      author: mockAdminId,
      assigned: [mockAdminId],
      date_created: Date.now(),
      tags: [{tag: mockTagId, value: mockTagValueId}],
      comments: [
        {
          author: mockUserId,
          timestamp: Date.now(),
          text: "I want to help, Michael!"
        }
      ]
    },
  ],
  members: [
    {
      user: mockAdminId,
      role: "Admin"
    },
    {
      user: mockUserId,
      role: "Developer"
    }
  ]
}

const removeProperty = (property) => {
  let p = cloneDeep(validProject);
  delete p[property];
  return p
}

const checkForError = (project, property) => {
  let error = project.validateSync()
  expect(error.message).toContain(`Path \`${property}\` is required.`)
}

describe('Test Project model', () => {

  it("should be valid if no required field is missing", () => {
    let project = new Project(validProject)

    let error = project.validateSync()
    expect(error).toBeUndefined()
  })

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

describe("Tags", () => {

  it("should contain name", () => {
    let p = cloneDeep(validProject);
    delete p.tags[0].name;
    let project = new Project(p);

    checkForError(project, "name")
  })

  it("should be invalid if values are missing", () => {
    let p = cloneDeep(validProject);
    delete p.tags[0].values;
    let project = new Project(p);
   
    let error = project.validateSync();
    expect(error.message).toContain("Tag values are required");
  })

  it("should be invalid if tag value name is missing", () => {
    let p = cloneDeep(validProject);
    delete p.tags[0].values[0].name;
    let project = new Project(p);

    checkForError(project, "name")
  })

  it("should be invalid if tag order is missing", () => {
    let p = cloneDeep(validProject);
    delete p.tags[0].values[0].order;
    let project = new Project(p);
    
    checkForError(project, "order")
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
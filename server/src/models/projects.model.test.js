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
          author: "Dwight Schrute",
          author_id: mockUserId,
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



const checkForError = (project, property) => {
  let error = project.validateSync()
  expect(error.message).toContain(`Path \`${property}\` is required.`)
}

describe('Project model', () => {
  const _removeProperty = (property) => {
    let p = cloneDeep(validProject);
    delete p[property];
    return p
  }

  it("should be valid if no required field is missing", () => {
    let project = new Project(validProject)

    let error = project.validateSync()
    expect(error).toBeUndefined()
  })

  it('should be invalid if title is missing', () => {
    let p = _removeProperty("title")
    let project = new Project(p)

    checkForError(project, "title")
  })

  it('should create empty string if description is missing', () => {
    let p = _removeProperty("description")
    let project = new Project(p)

    expect(p.description).toBeUndefined()
    expect(project.description).toEqual("")
  })

  it('should be invalid if date_created is missing', () => {
    let p = _removeProperty("date_created")
    let project = new Project(p)

    checkForError(project, "date_created")
  })

  it('should be invalid if created_by is missing', () => {
    let p = _removeProperty("created_by")
    let project = new Project(p)

    checkForError(project, "created_by")
  })

  it('should create empty array if tasks is missing', () => {
    let p = _removeProperty("tasks")
    let project = new Project(p)

    expect(p.tasks).toBeUndefined()
    expect(project.tasks).toEqual([])
  })

  it('should contain at least one member', () => {
    let p = _removeProperty("members")
    let project = new Project(p)

    let error = project.validateSync();
    expect(error.message).toContain("Project must have at least one member");
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
  const _removeProperty = (property) => {
    let p = cloneDeep(validProject);
    delete p.tasks[0][property];
    return p
  }

  it("should be invalid if titel is missing", () => {
    let p = _removeProperty('title');
    let project = new Project(p);

    checkForError(project, "title")
  })

  it("description should be empty if none is provided", () => {
    let p = _removeProperty('description');
    let project = new Project(p);

    expect(project.tasks[0].description).toEqual('');
  })

  it("should be invalid if author is missing", () => {
    let p = _removeProperty('author');
    let project = new Project(p);

    checkForError(project, "author")
  })

  it("should have empty array if assigned devs are missing", () => {
    let p = _removeProperty('assigned');
    let project = new Project(p);

    expect(project.tasks[0].assigned).toEqual([])
  })

  it("should be invalid if date_created is missing", () => {
    let p = _removeProperty('date_created');
    let project = new Project(p);

    checkForError(project, "date_created")
  })

  it("should have empty array if tags are missing", () => {
    let p = _removeProperty('tags');
    let project = new Project(p);

    expect(project.tasks[0].tags).toEqual([])
  })

  it("should have empty array if comments are missing", () => {
    let p = _removeProperty('comments');
    let project = new Project(p);

    expect(project.tasks[0].comments).toEqual([])
  })

})

describe('Comment', () => {
  const _removeProperty = (property) => {
    let p = cloneDeep(validProject);
    delete p.tasks[0].comments[0][property];
    return p
  }

  it("should be invalid if author is missing", () => {
    let p = _removeProperty("author");
    let project = new Project(p);

    checkForError(project, "author");
  })

  it("should be invalid if author_id is missing", () => {
    let p = _removeProperty("author_id");
    let project = new Project(p);

    checkForError(project, "author_id");
  })

  it("should be invalid if timestamp is missing", () => {
    let p = _removeProperty("timestamp");
    let project = new Project(p);

    checkForError(project, "timestamp");
  })

  it("should be invalid if text is missing", () => {
    let p = _removeProperty("text");
    let project = new Project(p);

    checkForError(project, "text");
  })
})

describe('Members', () => {
  it("should be invalid if user id is missing", () => {
    let p = cloneDeep(validProject);
    delete p.members[0].user
    let project = new Project(p);

    checkForError(project, "user")
  })

  it("should be invalid if role is missing", () => {
    let p = cloneDeep(validProject);
    delete p.members[0].role
    let project = new Project(p);

    checkForError(project, "role")
  })
})
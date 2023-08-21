<p align="center">
  <h1 align="center">Procrastinot <br> (🏗 In Progresss)</h1>

  <p align="center">
     <strong>Track and manage tasks and issues of your projects</strong>
    <br>
  </p>
  <a href="https://github.com/mhanki/Issue-Tracker">
    <img src="https://raw.githubusercontent.com/Schlenges/uploads/main/issue-tracker.jpg" alt="App Screenshot">
  </a> 
</p>


## Table of contents
- [About the App](#about-the-app)
- [Technical](#technical)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Licence](#license)

## About the App

**🏗 This app is still a work in progress. Find the current project plan [here](https://github.com/users/mhanki/projects/17).**


Procrastinot is an issue and task manager here to help you and your team stay organized as you work on projects.

## Features:

- **Project Creation**: Create projects and define their details such as project name, description, and individual tags to help track progress and keep your projects organized.

- **Issue and Task Management**: Create tickets for any issues and tasks, displaying details such as title, description, and pre-defined project tags. Team members can pick or be assigned to tickets and update tag values as the task is being worked on.

- **Collaborative Environment**: Easily add and remove team members and stay connected through real-time updates and comments.

## Technical

### Technologies Used

![Node](https://img.shields.io/static/v1?message=Node.js&logo=Node.js&logoColor=339933&label=%20&labelColor=595959&color=339933) 
![Express](https://img.shields.io/static/v1?message=Express&logo=Express&logoColor=fff&label=%20&labelColor=595959&color=0e0e0e) 
![MongoDB](https://img.shields.io/static/v1?message=MongoDB&logo=MongoDB&logoColor=47A248&label=%20&labelColor=595959&color=47A248) 
![Passport](https://img.shields.io/static/v1?message=Passport&logo=Passport&logoColor=34E27A&label=%20&labelColor=595959&color=black) 

![React](https://img.shields.io/static/v1?message=React&logo=React&logoColor=61DAFB&label=%20&labelColor=595959&color=61DAFB) 
![Sentry](https://img.shields.io/static/v1?message=Sentry&logo=sentry&logoColor=e1567c&label=%20&labelColor=595959&color=e1567c) 

## Development Setup

1. Clone the repository: `git clone https://github.com/mhanki/Issue-Tracker.git`
2. Install all dependencies: `npm install`
3. Set up a MongoDB database (e.g. via [MongoDB Atlas](https://www.mongodb.com/atlas)).
4. Create a dotenv (```.env```) file and add your connection string as a variable named ```MONGO_URL```.

To start the application, run:

```bash
npm start
```

By default, the server will run on port 5000 and the client on port 3000.


## API Endpoints

**Users & Auth**  
- `POST /users/signup`: Register a new user.  
- `POST /users/login`: Log in user with Passport. 
- `GET /users/:id`: Get a specific user. 
- `DELETE /users/:id`: Delete a specific user. 
- `GET /users/search/:email`: Find a user through their email address. 

**Projects** 
- `GET /projects`: Retrieve all projects of the logged in user.
- `GET /projects/:id`: Get a specific user project.
- `POST /projects`: Creates a new project.
- `PUT /projects/:id`: Updates a specific project.
- `DELETE /projects/:id`: Delete a specific project.

**Members**
- `GET /members/:projectId`: Get all members of a project.
- `GET /members/:projectId/:id`: Get a specific member of a project.
- `POST /members/:projectId`: Add a new member to a project.
- `DELETE /members/:projectId/:id`: Remove a specific member from a project. 
- `PUT /members/:projectId/:id`: Update the role of a specific member within a project. 

**Tasks** 
- `GET /tasks/:projectId`: Get all project tasks.
- `GET /tasks/:projectId/:id`: Get a specific project task.
- `POST /tasks/:projectId`: Add a new task to the project.
- `PUT /tasks/:projectId/:id`: Update a specific task of the project.
- `DELETE /tasks/:projectId/:id`: Delete a specific task of the project.

**Tags** 
- `GET /tags/:projectId`: Get all project tags.
- `GET /tags/:projectId/:id`: Get a specific project tag.
- `POST /tags/:projectId`: Add a new tag to the project.
- `PUT /tags/:projectId/:id`: Update a specific tag of the project.
- `DELETE /tags/:projectId/:id`: Delete a specific tag of the project.

**Comments** 
- `GET /comments/:projectId/:taskId`: Get all task comments.
- `GET /comments/:projectId/:taskId/:id`: Get a specific task comment.
- `POST /comments/:projectId/:taskId`: Create a new comment.
- `PUT /comments/:projectId/:taskId/:id`: Update a specific comment.
- `DELETE /comments/:projectId/:taskId/:id`: Delete a specific comment.


## Contributing

Found a **bug** or have a concrete **feature request**? Open a corresponding issue through the [Issues Tab](https://github.com/mhanki/Issue-Tracker/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

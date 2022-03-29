const express = require('express');
const router = express.Router();
const projects = require('../../controller/projects');

router.route('/')
  .get(projects.getAllByUser)
  .post(projects.createProject)

router.route('/:id')
  .get(projects.getById)
  .delete(projects.deleteProject)

module.exports = router;
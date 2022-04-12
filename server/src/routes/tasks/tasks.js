const express = require('express');
const router = express.Router();
const tasks = require('../../controller/tasks');

router.route('/:projectId')
  .get(tasks.getAll)
  .post(tasks.addTask)

router.route('/:projectId/:id')
  .get(tasks.getById)
  .delete(tasks.removeTask)
  .put(tasks.updateTask)

module.exports = router;
const express = require('express');
const router = express.Router();
const comments = require('../../controller/comments');

router.route('/:projectId/:taskId')
  .get(comments.getAll)
  .post(comments.addComment)

module.exports = router;
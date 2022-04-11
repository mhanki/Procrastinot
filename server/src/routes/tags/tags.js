const express = require('express');
const router = express.Router();
const tags = require('../../controller/tags');

router.route('/:projectId')
  .get(tags.getAll)
  .post(tags.addTag)

router.route('/:projectId/:tagId')
  .get(tags.getById)
  .delete(tags.removeTag)
  .put(tags.updateTag)

module.exports = router;
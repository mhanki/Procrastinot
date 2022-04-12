const express = require('express');
const router = express.Router();
const members = require('../../controller/members');

router.route('/:projectId')
  .get(members.getAll)
  .post(members.addMember)

router.route('/:projectId/:id')
  .get(members.getById)
  .delete(members.removeMember)
  .put(members.updateRole)

module.exports = router;
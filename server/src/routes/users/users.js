const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../../controller/users');

router.post('/signup', users.register);

router.route('/login')
  .get((req, res) => { res.send('Failed to log in') })
  .post(passport.authenticate('local', { failureMessage: true, failureRedirect: '/login'}), users.login);

router.delete('/', users.deleteUser);

module.exports = router;

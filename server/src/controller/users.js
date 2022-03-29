const catchAsync = require('../utils/catchAsync');
const User = require('../models/users');

const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({name, email});
  const registeredUser = await User.register(user, password);

  req.login(registeredUser, (err) => {
    if (err) return next(err);
    res.send('success');
  })
})

const login = (req, res) => {
  res.send('success');
}

const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).populate('projects');

  res.send(user.projects)
})

module.exports = { register, login, deleteUser };
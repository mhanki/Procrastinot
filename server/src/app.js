const express = require('express');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/users');

const userRoutes = require('./routes/users/users');
const projectRoutes = require('./routes/projects/projects');
const taskRoutes = require('./routes/tasks/tasks');

const app = express();

const sessionConfig = {
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(express.json());
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

app.use('/', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;
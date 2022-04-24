const express = require('express');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/users');
const Sentry = require("@sentry/node");

const userRoutes = require('./routes/users/users');
const projectRoutes = require('./routes/projects/projects');
const tagsRoutes = require('./routes/tags/tags');
const membersRoutes = require('./routes/members/members');
const tasksRoutes = require('./routes/tasks/tasks');
const commentsRoutes = require('./routes/comments/comments');

require('dotenv').config();

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

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

app.use(Sentry.Handlers.requestHandler());
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

/* app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
}); */
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tags', tagsRoutes);
app.use('/members', membersRoutes);
app.use('/tasks', tasksRoutes);
app.use('/comments', commentsRoutes);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Temporary error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
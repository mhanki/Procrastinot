const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

require('dotenv').config();

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log(profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/auth/google', passport.authenticate('google',{ 
  scope: ['email', 'profile'] 
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/failure',
  successRedirect: '/',
  session: false
}));

app.get('/failure', (req, res) => {
  return res.send('Failed to log in');
});

module.exports = app;
const express = require('express');
const Router = express.Router({ caseSensitive: true });
const auth = require('./auth');
const users = require('./users');
const movies = require('./movies');
const lists = require('./lists');

Router.use('/api/auth', auth);
Router.use('/api/users', users);
Router.use('/api/movies', movies);
Router.use('/api/lists', lists);

module.exports = Router;

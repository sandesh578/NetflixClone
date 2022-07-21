const Router = require('express').Router();
const Movies = require('../models/Movies');
const { catchErrors } = require('../utils/custom-helpers.js');
const { verify } = require('../verifyToken.js');

//create
Router.post(
  '/',
  verify,
  catchErrors(async (req, res, next) => {
    if (req.user.isAdmin) {
      try {
        const newMovie = new Movies(req.body);
        const savedMovie = await newMovie.save();
        res.status(200).json({ savedMovie });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You are not allowed to add new movie' });
    }
  })
);

//update
Router.put(
  '/:id',
  verify,
  catchErrors(async (req, res, next) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movies.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body
          },
          {
            new: true
          }
        );
        res.status(200).json({ updatedMovie });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You are not allowed to add new movie' });
    }
  })
);

//delete
Router.delete(
  '/:id',
  verify,
  catchErrors(async (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await Movies.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Movie has been deleted' });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You are not allowed to delete' });
    }
  })
);

//get
Router.get(
  'find/:id',
  verify,
  catchErrors(async (req, res, next) => {
    try {
      const movie = await Movies.findById(req.params.id);
      res.status(200).json({ movie });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  })
);

//get random
Router.get(
  '/random',
  verify,
  catchErrors(async (req, res, next) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === 'series') {
        movie = await Movies.aggregate([
          {
            $match: { isSeries: true }
          },
          {
            $sample: { size: 1 }
          }
        ]);
      } else {
        movie = await Movies.aggregate([
          {
            $match: { isSeries: false }
          },
          {
            $sample: { size: 1 }
          }
        ]);
      }
      res.status(200).json({ movie });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  })
);

//get all
Router.get(
  '/',
  verify,
  catchErrors(async (req, res, next) => {
    if (req.user.isAdmin) {
      try {
        const movies = await Movies.find();
        res.status(200).json({ movies: movies.reverse() });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You are not allowed to see all movies' });
    }
  })
);

module.exports = Router;

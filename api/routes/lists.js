const Router = require('express').Router();
const Lists = require('../models/List');
const { catchErrors } = require('../utils/custom-helpers.js');
const { verify } = require('../verifyToken.js');

//create
Router.post(
  '/',
  verify,
  catchErrors(async (req, res, next) => {
    if (req.user.isAdmin) {
      try {
        const newList = new Lists(req.body);
        const savedList = await newList.save();
        res.status(201).json({ savedList });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You are not allowed to add new list' });
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
        await Lists.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'List has been deleted' });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You are not allowed to delete the list' });
    }
  })
);

//get
Router.get(
  '/',
  verify,
  catchErrors(async (req, res, next) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await Lists.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } }
          ]);
        } else {
          list = await Lists.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } }
          ]);
        }
      } else {
        list = await Lists.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json({ list });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  })
);

module.exports = Router;

const Router = require('express').Router();
const User = require('../models/User');
const { catchErrors } = require('../utils/custom-helpers.js');
const { encrypt } = require('../crypto/fileCrypto');
const { verify } = require('../verifyToken.js');

//update
Router.put(
  '/:id',
  verify,
  catchErrors(async (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = encrypt(req.body.password);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body
          },
          { new: true }
        );
        res.status(200).json({ updatedUser });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You can update only your account' });
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
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'User has been deleted' });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You can delete only your account' });
    }
  })
);

//get
Router.get(
  'find/:id',
  verify,
  catchErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json({ info });
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
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(10)
          : await User.find();
        res.status(200).json({ users });
      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    } else {
      res.status(403).json({ msg: 'You are not allowed to see all users' });
    }
  })
);

//get user stats
Router.get(
  '/stats',
  verify,
  catchErrors(async (req, res, next) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const monthsArray = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: '$createdAt' }
          }
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 }
          }
        }
      ]);
      res.status(200).json({ data });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  })
);

module.exports = Router;

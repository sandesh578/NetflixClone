const Router = require('express').Router();
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.dev' });
const { catchErrors } = require('../utils/custom-helpers.js');
const { encrypt, decrypt } = require('../crypto/fileCrypto');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

//register
Router.post(
  '/register',
  catchErrors(async (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: encrypt(req.body.password)
    });
    const user = await newUser.save();
    res.status(201).json(user);
  })
);

//login
Router.post(
  '/login',
  catchErrors(async (req, res, next) => {
    const user = await User.findOne({
      email: req.body.email
    });
    !user && res.status(401).json({ msg: 'Wrong password or email' });

    const originalPassword = decrypt(user.password);

    originalPassword !== req.body.password &&
      res.status(401).json({ msg: 'Wrong password or email' });

    const { password, ...info } = user._doc;

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      SECRET_KEY,
      { expiresIn: '5d' }
    );

    res.status(200).json({ info, accessToken });
  })
);

module.exports = Router;

const express = require("express");
const router = express.Router();
const User = require('./user.model');

router.post("", (req, res, next) => {
    console.log(req.body);
    const user = new User({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user.save().then(createdUser => {
      res.status(201).json({
      message: 'User added successfully',
      user: {
        id: createdUser._id,
        lastname: createdUser.lastname,
        firstname: createdUser.firstname,
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password
      }
  });
  });
});

router.get("", (req, res, next) => {
    User.find()
        .then(documents => {
            res.status(200).json({
                message: 'Users fetched successfully!',
                users: documents
            });
        });
});

router.get("/:id", (req, res, next) => {
    User.findById(req.params.id).then(user => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({message: 'User not found!'});
        }
    });
});

module.exports = router;

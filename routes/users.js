const express    = require('express');
const router = express.Router()
const User     = require('../app/models/user');

router.post('/',  async (req, res, next) => {
  try {
    const user1 = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    User.findOne({email: req.body.email}, function (err, user)
    {
      if (user && user.email === req.body.email ){
        console.log("user is already registered")
       return res.status(500).send("There was a problem registering the user.")
      }else {
        user1.save(function(err) {
          if (err)
         return    res.send(err);
        });
      }
      return res.status(200).json(user1);
    })
  } catch (e) {
    next(e);
  }
})



// get all the bears (accessed at GET http://localhost:8080/api/bears)
router.get('/',  async (req, res, next) => {
  try {
    const users = await User.find(function(err, users) {
      if (err)
      res.send(err);

    });
    return res.status(200).json(users)
  } catch (e) {
    next(e);
  }
})


// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/users/:user_id')

// get the bear with that id
router.get('/:user_id',  async (req, res, next) => {
  try {
    const users = await User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

    });
    return res.status(200).json(users)
  } catch (e) {
    next(e);
  }
})

  // update the bear with this id
router.put('/:id',  async (req, res, next) => {
  try {
    const users = await User.findById(req.params.user_id, function(err, user) {

      if (err)
       return res.send(err);

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.save(function(err) {
        if (err)
        return  res.send(err);
      });

    });
    return res.status(200).json(users)
  } catch (e) {
    next(e);
  }
})

  // delete the bear with this id
router.delete('/:id',  async (req, res, next) => {
  try {
    const users = await User.remove({
      _id: req.params.id
    }, function(err, user) {
      if (err)
        return res.send(err);
    });
    return res.status(200).json(users)
  } catch (e) {
    next(e);
  }
})


module.exports = router;

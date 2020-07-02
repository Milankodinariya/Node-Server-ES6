const express    = require('express');
const router = express.Router();
const User     = require('../app/models/user');

router.post('/',  async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password});
    if (user === null){
       console.log("invalid")
      return  res.status(500).send("There was a problem registering the user.")
    } else if (user.email === req.body.email && user.password === req.body.password){
      console.log(req.body.email, req.body.password)
     return res.json(user);
    } else {
      console.log(req.body.email, req.body.password, user.email)
      console.log(user._doc)
      console.log('Credentials wrong');
    return res.status(500).send("There was a problem registering the user.")
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;

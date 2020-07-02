const express    = require('express');
const router = express.Router()
const Candidate     = require('../app/models/candidate');


/*router.post('/',  async (req, res, next) => {
  try {
    const candidate = await new Candidate({
      title: req.body.title,
      length: req.body.length,
      category: req.body.category,
      author: req.body.author,
    });
   candidate.save(function (err) {
     if (err){
       return res.send(err)

     }
    return res.json(candidate)
   })
    console.log(candidate)

  } catch (e) {
    next(e);
  }
})*/

router.post('/',  async (req, res, next) => {
  try {
    const candidate = await new Candidate({
      title: req.body.title,
      length: req.body.length,
      category: req.body.category,
      author: req.body.author,
    });
    candidate.save(function (err) {
      if (err)
         res.send(err);
      return res.status(200).json(candidate);
    });

    return console.log('--candidate--', candidate)
  } catch (e) {
    next(e);
  }
})


router.get('/',  async (req, res, next) => {
  try {
    const candidate = await Candidate(function(err, candidate) {
      if (err)
        res.send(err);

    });
    console.log(candidate)
    return res.status(200).json(candidate)

  } catch (e) {
    next(e);
  }
})





module.exports = router;

var router = require('express').Router();
var institutionRouter = require('./institution');

router.get('/', function(req, res) {
  res.send('Welcome to the api');
});

router.use('/institutions', institutionRouter);

module.exports = router;
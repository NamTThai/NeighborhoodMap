var express = require('express');
var router = express.Router();

var bower = require('../bower.json');

// Get home page
router.get('/', function(req, res) {
  res.render('index', {
    appName: bower.name,
    appTitle: bower.title
  });
});

router.get('/markers', function(req, res) {
  var markers = require('../data/marker.json');
  res.json(markers);
});

router.get('/yelp', function(req, res) {
  var yelp = require('yelp').createClient(require('../data/yelp-oauth.json'));
  console.log(req.query.name);
  require('./log').debug(req.query.name);

  yelp.business(req.query.name, function(error, data) {
    if (error) {
      res.status(404).send(error);
      return;
    }

    res.json(data);
  });
});

module.exports = router;

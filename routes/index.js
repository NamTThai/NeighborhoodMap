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

module.exports = router;

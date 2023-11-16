process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const express = require("express");
const axios = require('axios');
const router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require("path");

function funGet(req, res) {
  res.render(path.join(__dirname + '/frontend-PassesPerStation.ejs'));
};

function funPost(req, res) {
  var station = req.body.station;
  var datef = req.body.datef;
  var datet = req.body.datet;
  var format = req.body.format;

  if (format == "on") {
    res.redirect('https://localhost:9103/interoperability/api/PassesPerStation/' + station + '/'+ datef.replace(/-/g, '') + '/'
    + datet.replace(/-/g, '') + '?format=csv');

    // axios({
    //   method: 'get',
    //   url: 'https://localhost:9103/interoperability/api/PassesPerStation/'
    //   + station + '/'+ datef.replace(/-/g, '') + '/' + datet.replace(/-/g, '') + '&format=csv'
    // })
    //   .then(response => res.render(path.join(__dirname + '/frontend-ResponsePassesPerStation.ejs'),
    // response.data))
    //   .catch(err => console.error(err));

  } else {
    res.redirect('https://localhost:9103/interoperability/api/PassesPerStation/' + station + '/'+ datef.replace(/-/g, '') + '/'
    + datet.replace(/-/g, ''));

  //   axios({
  //     method: 'get',
  //     url: 'https://localhost:9103/interoperability/api/PassesPerStation/'
  //     + station + '/'+ datef.replace(/-/g, '') + '/' + datet.replace(/-/g, '')
  //   })
  //     .then(response => res.render(path.join(__dirname + '/frontend-ResponsePassesPerStation.ejs'),
  //   response.data))
  //     .catch(err => console.error(err));
  }
};

router.get('/PassesPerStation', funGet)
router.post('/PassesPerStation', funPost)
module.exports = router;

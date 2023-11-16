process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const express = require("express");
const axios = require('axios');
const router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require("path");

function funGet(req, res) {
  res.render(path.join(__dirname + '/frontend-PassesAnalysis.ejs'));
};

function funPost(req, res) {
  var op_1 = req.body.op_1;
  var op_2 = req.body.op_2;
  var datef = req.body.datef;
  var datet = req.body.datet;
  var format = req.body.format;

  if (format == "on") {
    res.redirect('https://localhost:9103/interoperability/api/PassesAnalysis/' + op_1 + '/' + op_2
    + '/'+ datef.replace(/-/g, '') + '/' + datet.replace(/-/g, '') + '?format=csv');

  } else {
    res.redirect('https://localhost:9103/interoperability/api/PassesAnalysis/' + op_1 + '/' + op_2
    + '/'+ datef.replace(/-/g, '') + '/' + datet.replace(/-/g, ''));

  }
};

router.get('/PassesAnalysis', funGet)
router.post('/PassesAnalysis', funPost)
module.exports = router;

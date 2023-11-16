process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const express = require("express");
const axios = require('axios');
const router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require("path");

function funGet(req, res) {
  res.render(path.join(__dirname + '/frontend-Payoff.ejs'));
};

function funPost(req, res) {
  var op_1 = req.body.op_1;
  var op_2 = req.body.op_2;
  var psp = req.body.psp;
  var amount = req.body.amount;
  var date = req.body.date;
  var time = req.body.time;

  axios({
    method: 'get',
    url: 'https://localhost:9103/interoperability/api/Payoff/' + op_1 + '/' + op_2
          + '/' + psp + '/'+ amount + '/'+ date.replace(/-/g, '') + time.replace(/:/g, '')
  })
    .then(response => res.render(path.join(__dirname + '/frontend-ResponsePayoff.ejs'),
    response.data))
    .catch(err => console.error(err));
};

router.get('/Payoff', funGet)
router.post('/Payoff', funPost)
module.exports = router;

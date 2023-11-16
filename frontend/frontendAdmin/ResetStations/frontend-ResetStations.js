process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const express = require("express");
const axios = require('axios');
const router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require("path");

function funGet(req, res) {
  res.render(path.join(__dirname + '/frontend-ResetStations.ejs'));
};

function funPost(req, res) {
  axios({
    method: 'get',
    url: 'https://localhost:9103/interoperability/api/admin/resetstations'
  })
    .then(response => res.render(path.join(__dirname + '/frontend-ResponseResetStations.ejs'),
    response.data))
    .catch(err => console.error(err));
};

router.get('/resetstations', funGet)
router.post('/resetstations', funPost)
module.exports = router;

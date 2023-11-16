process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const express = require("express");
const axios = require('axios');
const router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require("path");

function funGet(req, res) {
  res.render(path.join(__dirname + '/frontend-ResetVehicles.ejs'));
};

function funPost(req, res) {
  axios({
    method: 'get',
    url: 'https://localhost:9103/interoperability/api/admin/resetvehicles'
  })
    .then(response => res.render(path.join(__dirname + '/frontend-ResponseResetVehicles.ejs'),
    response.data))
    .catch(err => console.error(err));
};

router.get('/resetvehicles', funGet)
router.post('/resetvehicles', funPost)
module.exports = router;

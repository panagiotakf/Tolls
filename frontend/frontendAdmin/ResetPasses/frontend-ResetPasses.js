process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const express = require("express");
const axios = require('axios');
const router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require("path");

function funGet(req, res) {
  res.render(path.join(__dirname + '/frontend-ResetPasses.ejs'));
};

function funPost(req, res) {
  axios({
    method: 'get',
    url: 'https://localhost:9103/interoperability/api/admin/resetpasses'
  })
    .then(response => res.render(path.join(__dirname + '/frontend-ResponseResetPasses.ejs'),
    response.data))
    .catch(err => console.error(err));
};

router.get('/resetpasses', funGet)
router.post('/resetpasses', funPost)
module.exports = router;

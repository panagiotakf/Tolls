const express = require("express");
const router = express.Router();
var mysql = require('mysql2');
const ObjectsToCsv = require('objects-to-csv');
const { Parser } = require('json2csv');
const fields = ['status', 'dbconnection.host', 'dbconnection.user' ,  'dbconnection.password',  'dbconnection.database'];




const parser = new Parser({ fields });


//const parser = new Parser();
//const parser1=new Parser();


function adminHealthCheck(req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	const current_url = new URL(fullUrl);
        const search_params = current_url.searchParams;

	var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hachiko20005",
    database: "softengdb"
	});

  con.connect(function(err) {
    if (err) {
	     if(search_params.has('format') && ( search_params.get('format')=='csv')){
		    // const csv1=parser1.parse({ host:"localhost",user:"root",password:"******",database:"base1"});
		     const csv=parser.parse({status:"failed","dbconnection":{"host":"localhost","user":"root","password":"************","database":"softengdb"}});
		     res.status(500).send(csv);
	     }
	     else{
		     const message = {
			     status:"failed",
			     dbconnection:{
				     host:"localhost",
				     user:"root",
             password: "hachiko20005",
             database: "softengdb"
			     }
		     }
		     result = JSON.stringify(message);
		     res.status(500).send(result);
	     }

    } else {
	     if(search_params.has('format') && ( search_params.get('format')=='csv')){
		   //  const csv1=parser1.parse({ host:"localhost",user:"root",password:"******",database:"base1"});
		     const csv=parser.parse({"status":"OK","dbconnection":{"host":"localhost","user":"root","password":"************","database":"softengdb"}});
		     res.status(200).send(csv);
	     }
	     else{
		     const message = {
			     status:"OK",
			     dbconnection:{
				     host:"localhost",
				     user:"root",
                                     password:"************",
                                     database:"softengdb"
			     }
		     }
		     result = JSON.stringify(message);
		     res.status(200).send(result);
	     }
    }





  });
};

router.get('/admin/healthcheck', adminHealthCheck);
module.exports = router;

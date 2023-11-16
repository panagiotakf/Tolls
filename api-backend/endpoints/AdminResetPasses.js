const express = require("express");
const router = express.Router();
var mysql = require('mysql2');

function adminResetPasses(req, res) {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hachiko20005",
    database: "softengdb"
  });
	con.connect(function(err){
		if (err) {
			res.status(500).send({"status":"failed"});

		}
		else{
			let myquery="Truncate Pass";
			con.query(myquery,function(err,result,fields){
				if(err) {
					const message = {
						status:"failed"
					}
					const result = JSON.stringify(message);
					res.status(500).send(result);
				} else {
					const message = {status:"OK"}
					const result = JSON.stringify(message);
					res.status(200).send(result);
				}
			});
		}
	});
};








router.get('/admin/resetpasses', adminResetPasses);
module.exports = router;

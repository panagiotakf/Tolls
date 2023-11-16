const express=require('express');
const router=express.Router();
var mysql=require('mysql2');
const { Parser } = require('json2csv');




const parser = new Parser();


function lastPayment(req,res){
	var operatorCredited=req.params.operatorCredited;

	var con=mysql.createConnection({
		host: "localhost",
    user: "root",
    password: "hachiko20005",
    database: "softengdb"
	});
	con.connect(function(err){
		if (err)  res.status(500).send({"status":"failed"});
		else{
			let myquery="SELECT  operatorDebited,MAX(payment_date) AS latest_payment FROM payment_details  where operatorCredited='"+operatorCredited+"' group by(operatorDebited)";
			con.query(myquery,function(err,result,fields){
				if (err)  res.status(500).send({"status":"failed"});
				else if (result.length==0){
					 res.status(402).send({"status":"failed"});
				}
				else{
					var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
					const current_url = new URL(fullUrl);
					const search_params = current_url.searchParams;
					if(search_params.has('format') && search_params.get('format')=='csv'){
						const csv=parser.parse(result);
						res.status(200).send(csv);
					}
					else{
						res.status(200).send(result);
					}
				}
			});
		}
	});
}
router.get('/LastPayment/:operatorCredited',lastPayment);
module.exports=router;

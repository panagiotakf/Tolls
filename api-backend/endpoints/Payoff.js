const express=require('express');
const router=express.Router();
var mysql=require('mysql2');

function payoff(req,res){
	var operatorCredited=req.params.op1_ID;
	var operatorDebited=req.params.op2_ID;
	var pspId=req.params.bank;
	var total_amount=req.params.amount;
        var payment_date=req.params.date;
        payment_date=payment_date.slice(0,4)+"-"+payment_date.slice(4,6)+"-"+payment_date.slice(6,8)+" "+payment_date.slice(8,10)+":"+payment_date.slice(10,12)+":"+"00";
	var values=[ pspId, operatorCredited,operatorDebited, total_amount, payment_date];

	var con=mysql.createConnection({
		host: "localhost",
    user: "root",
    password: "hachiko20005",
    database: "softengdb"
	});
	con.connect(function(err){
		if (err) res.status(500).send({"status":"failed"});
		else{
			let myquery2="INSERT INTO payment_details (paymentRef,pspId,operatorCredited,operatorDebited,total_amount,payment_date) VALUES (NULL,?) ";
			con.query(myquery2,[values],function(err,result2,fields){
				if (err) res.status(500).send({"status":"failed"});
				else if(result2.length==0) res.status(402).send({"status":"failed"});
				else{
					res.status(200).send({"status":"succesful"});
				}


			});
		}
	});
}
router.get('/Payoff/:op1_ID/:op2_ID/:bank/:amount/:date',payoff);
module.exports=router;

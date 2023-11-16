const express=require('express');
const router=express.Router();
var mysql=require('mysql2');
const { Parser, transforms: { unwind } } = require('json2csv');
const fields = ['op1_ID','op2_ID', 'RequestTimestamp', 'PeriodFrom', 'PeriodTo','NumberOfPasses', 'Passlist.PassIndex', 'Passlist.PassID','PassList.StationID','Passlist.TimeStamps','Passlist.VehicleID','Passlist.Charge'];
const transforms = [unwind({ paths: ['Passlist'] })];




const parser = new Parser({ fields, transforms });







//const parser = new Parser();
//const parser2=new Parser();


const d=new Date();
const year=String(d.getFullYear());
const month=String(d.getMonth()+1);
const day=String(d.getDate());
const hour=String(d.getHours());
const minute=String(d.getMinutes());
const sec=String(d.getSeconds());
const s=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+sec;

function passesAnalysis(req,res){
	var date_from=req.params.date_from;
	var date_to=req.params.date_to;
	date_to=date_to.slice(0,4)+"-"+date_to.slice(4,6)+"-"+date_to.slice(6,8)+" "+"23:59:59";
	date_from=date_from.slice(0,4)+"-"+date_from.slice(4,6)+"-"+date_from.slice(6,8)+" "+"00:00:00";
	var op1_ID=req.params.op1_ID;
	var op2_ID=req.params.op2_ID;


	var con=mysql.createConnection({
		host: "localhost",
    user: "root",
    password: "hachiko20005",
    database: "softengdb"
	});
	con.connect(function(err){
		if (err)  res.status(500).send({"status":"failed"});
		else{
			let myquery1="SET @row_number = 0"
			con.query(myquery1,function(err,result1,fields){
				if (err) res.status(500).send({"status":"failed"});
				else if(result1.length==0) res.status(402).send({"status":"failed"});
				else{
					let myquery2="Select  @row_number := @row_number + 1 AS PassIndex, Pass1.passId as PassID, Pass1.StationRef as StationID, Pass1.timestamps as TimeStamps, Pass1.vehicleRef as VehicleID, Pass1.charge as Charge from (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge from Pass inner join Station on Pass.stationRef=Station.stationRef where Station.ProviderId='"+ op1_ID+"') as Pass1 inner join (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge from Pass inner join Tags on Pass.vehicleRef=Tags.vehicleRef where Tags.providerId='"+op2_ID+"') as Pass2 on Pass1.passId=Pass2.passId where Pass1.timestamps between '"+ date_from + "' and '" +date_to+ "'";
					con.query(myquery2,function(err,result2,fields){
						if (err) res.status(500).send({"status":"failed"});
						else if(result2.length==0) res.status(402).send({"status":"failed"});
						else{
							let myquery3="Select Count(*) as NP from (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge from Pass inner join Station on Pass.stationRef=Station.stationRef where Station.ProviderId='"+ op1_ID+"') as Pass1 inner join (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge from Pass inner join Tags on Pass.vehicleRef=Tags.vehicleRef where Tags.providerId='"+op2_ID+"') as Pass2 on Pass1.passId=Pass2.passId where Pass1.timestamps between '"+ date_from + "' and '" +date_to+ "'";
							con.query(myquery3,function(err,result3,fields){
								if (err) res.status(500).send({"status":"failed"});
								else if(result3.length==0) res.status(402).send({"status":"failed"});
								else{
									var[x]=result3;
									var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
									const current_url = new URL(fullUrl);
									const search_params = current_url.searchParams;
									if(search_params.has('format')) {
										const format = search_params.get('format');
										if(format=='csv'){
											var result={op1_ID:op1_ID,op2_ID:op2_ID,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,NumberOfPasses:x.NP,Passlist:result2};
											const csv = parser.parse(result);
											res.status(200).send(csv);
										}
										else{
											var result={op1_ID:op1_ID,op2_ID:op2_ID,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,NumberOfPasses:x.NP,Passlist:result2};
											res.status(200).send(result);
										}
									}
									else{
										var result={op1_ID:op1_ID,op2_ID:op2_ID,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,NumberOfPasses:x.NP,Passlist:result2};
										res.status(200).send(result);
									}
								}



				});
						}

			});
				}
		});
		}
	});
}
router.get('/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to',passesAnalysis);
module.exports=router;

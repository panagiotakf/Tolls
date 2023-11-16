const express=require('express');
const router=express.Router();
var mysql=require('mysql2');
const { Parser, transforms: { unwind } } = require('json2csv');
const fields = ['op1_ID', 'RequestTimestamp', 'PeriodFrom', 'PeriodTo', 'PPOList.VisitingOperator', 'PPOList.debt_from'];
const transforms = [unwind({ paths: ['PPOList'] })];




const parser = new Parser({ fields, transforms });



const d=new Date();
const year=String(d.getFullYear());
const month=String(d.getMonth()+1);
const day=String(d.getDate());
const hour=String(d.getHours());
const minute=String(d.getMinutes());
const sec=String(d.getSeconds());
const s=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+sec;

function debtAnalysis(req,res){
	var date_from=req.params.date_from;
	var date_to=req.params.date_to;
	date_to=date_to.slice(0,4)+"-"+date_to.slice(4,6)+"-"+date_to.slice(6,8)+" "+"23:59:59";
	date_from=date_from.slice(0,4)+"-"+date_from.slice(4,6)+"-"+date_from.slice(6,8)+" "+"00:00:00";
	var op1_ID=req.params.op1_ID;


	var con=mysql.createConnection({
		host: "localhost",
    user: "root",
    password: "hachiko20005",
    database: "softengdb"
	});
	con.connect(function(err){
		if (err) res.status(500).send({"status":"failed"});
		else{
			let myquery1="select table1.VisitingOperator as VisitingOperator,case when table1.Charge-table2.charge<0 then table1.Charge-table2.charge when table2.charge is null then table1.Charge else   table1.Charge-table2.charge end as debt_from from (Select Pass2.providerId as VisitingOperator, SUM(Pass1.charge) as Charge, Count(*) as NumberofPasses from (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge  from Pass inner join Station on Pass.stationRef=Station.stationRef where Station.ProviderId='"+ op1_ID+"') as Pass1 inner join (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge,Tags.providerId from Pass inner join Tags on Pass.vehicleRef=Tags.vehicleRef where Tags.providerId<>'"+ op1_ID+"') as Pass2 on Pass1.passId=Pass2.passId where Pass1.timestamps between '"+ date_from + "' and '" +date_to+ "' group by VisitingOperator)  as table1 left JOIN (Select  Pass2.providerId as StationOperator, SUM(Pass1.charge) as Charge from (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge from Pass inner join Tags on Pass.vehicleRef=Tags.vehicleRef where Tags.ProviderId='"+ op1_ID+"') as Pass1 inner join (Select Pass.passId,Pass.stationRef,Pass.vehicleRef,Pass.timestamps,Pass.charge,Station.providerId from Pass inner join Station on Pass.stationRef=Station.stationRef where Station.providerId<>'"+ op1_ID+"') as Pass2 on Pass1.passId=Pass2.passId where Pass1.timestamps between '"+ date_from + "' and '" +date_to+ "' group by StationOperator) as table2 on table1.VisitingOperator=table2.StationOperator";
			con.query(myquery1,function(err,result1,fields){
			if (err) res.status(500).send({"status":"failed"});
			else if(result1.length==0){
				res.status(402).send({"status":"failed"});
			}

			else{
				for(i=0;i<result1.length;i++){
					result1[i].debt_from=Math.round((result1[i].debt_from+ Number.EPSILON) * 100) / 100
				}


				var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
				const current_url = new URL(fullUrl);
				const search_params = current_url.searchParams;
				if(search_params.has('format') && search_params.get('format')=='csv'){
					var result={op1_ID:op1_ID,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,PPOList:result1};
					const csv=parser.parse(result);
					res.status(200).send(csv);
				}
				else{
					var result={op1_ID:op1_ID,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,PPOList:result1};
					res.status(200).send(result);
			}

		}
			});
		}
	});







}
router.get('/DebtAnalysis/:op1_ID/:date_from/:date_to',debtAnalysis);
module.exports=router;

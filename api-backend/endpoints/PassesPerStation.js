const express=require('express');
const router=express.Router();
var mysql=require('mysql2');
const url=require('url');
const { Parser, transforms: { unwind } } = require('json2csv');
const fields = ['Station','StationOperator', 'RequestTimestamp', 'PeriodFrom', 'PeriodTo','NumberOfPasses', 'Passlist.PassIndex', 'Passlist.PassID','Passlist.PassTimeStamp','Passlist.VehicleID','Passlist.TagProvider','Passlist.PassType','Passlist.PassCharge'];
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

function passesPerStation(req,res){
	var date_from=req.params.date_from;
	var date_to=req.params.date_to;
	date_to=date_to.slice(0,4)+"-"+date_to.slice(4,6)+"-"+date_to.slice(6,8)+" "+"23:59:59";
	date_from=date_from.slice(0,4)+"-"+date_from.slice(4,6)+"-"+date_from.slice(6,8)+" "+"00:00:00";
	var stationId=req.params.stationID;


	var con=mysql.createConnection({
		host: "localhost",
    user: "root",
    password: "hachiko20005",
    database: "softengdb"
	});
	con.connect(function(err){
		if (err) res.status(500).send({"status":"failed"});
		else{
			let myquery1="SET @row_number = 0"
			con.query(myquery1,function(err,result1,fields){
				if (err) res.status(500).send({"status":"failed"});
				else if(result1.length==0) res.status(402).send({"status":"failed"});
				else{
					//let myquery2="Select  @row_number := @row_number + 1 AS PassIndex, table1.passId as PassID,table1.timestamps as PassTimeStamp,table1.vehicleRef as VehicleID,Tags.providerId as TagProvider,case when table1.providerId=Tags.providerId then 'home' when table1.providerId<>Tags.providerId  then 'visitor' end as PassType,table1.charge as PassCharge from (Select Pass1.passId,Pass1.stationRef,Pass1.vehicleRef,Pass1.timestamps,Pass1.charge,Station1.providerId From  (Select * From Pass as Pass1 Where  Pass1.timestamps BETWEEN '"+date_from+"'"+  " AND '"+date_to+"') as Pass1 Join (SELECT Station1.stationRef, Provider.provider_name,Provider.providerId FROM Station as Station1 INNER JOIN Provider ON Station1.providerId=Provider.providerId  Where Station1.stationRef='"+ stationId +"'  ) as Station1 ON Station1.stationRef=Pass1.stationRef) as table1 Inner Join (Select Tags.vehicleRef,Tags.providerId,Provider.provider_name from Tags Inner Join Provider on Tags.providerId=Provider.providerId) as Tags ON Tags.vehicleRef=table1.vehicleRef";
					let myquery2="Select  @row_number := @row_number + 1 AS PassIndex, table1.passId as PassID,table1.timestamps as PassTimeStamp,table1.vehicleRef as VehicleID,Tags.providerId as TagProvider,case when table1.providerId=Tags.providerId then 'home' when table1.providerId<>Tags.providerId  then 'visitor' end as PassType,table1.charge as PassCharge from (Select Pass1.passId,Pass1.stationRef,Pass1.vehicleRef,Pass1.timestamps,Pass1.charge,Station.providerId From  (Select * From Pass as Pass1 Where  Pass1.timestamps BETWEEN '"+date_from+"'"+  " AND '"+date_to+"') as Pass1 inner join Station on Station.stationRef=pass1.stationRef Where Station.stationRef='"+ stationId +"') as table1 Inner Join Tags ON Tags.vehicleRef=table1.vehicleRef";
					con.query(myquery2,function(err,result2,fields){
						if (err) res.status(500).send({"status":"failed"});
				                else if(result2.length==0) res.status(402).send({"status":"failed"});
						else{
							let myquery3="SELECT providerId as StationOperator from Station Where StationRef='"+ stationId+"'"  ;
							con.query(myquery3,function(err,result3,fields){
								if (err) res.status(500).send({"status":"failed"});
			                        	        else if(result3.length==0) res.status(402).send({"status":"failed"});
								else{
									let myquery4="SELECT Count(*) as NumberOfPasses from (Select Pass1.passId,Pass1.stationRef,Pass1.vehicleRef,Pass1.timestamps,Pass1.charge,Station.providerId From  (Select * From Pass as Pass1 Where  Pass1.timestamps BETWEEN '"+date_from+"'"+  " AND '"+date_to+"') as Pass1 inner join Station on Station.stationRef=pass1.stationRef Where Station.stationRef='"+ stationId +"') as table1 Inner Join Tags ON Tags.vehicleRef=table1.vehicleRef";
									con.query(myquery4,function(err,result4,fields){
										if (err) res.status(500).send({"status":"failed"});
				                                                else if(result4.length==0) res.status(402).send({"status":"failed"});
										else{
											var [x]=result3;
										        var [y]=result4;

										        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
						                                        const current_url = new URL(fullUrl);
						                                        const search_params = current_url.searchParams;

						                                        if(search_params.has('format')) {
												const format = search_params.get('format');
												if(format=='csv'){
													var result={Station:stationId,StationOperator:x.StationOperator,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,NumberOfPasses:y.NumberOfPasses,Passlist:result2};
								                                        const csv = parser.parse(result);
								                                        res.status(200).send(csv);
											        }
											        else{
													var result={Station:stationId,StationOperator:x.StationOperator,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,NumberOfPasses:y.NumberOfPasses,Passlist:result2};
													res.status(200).send(result);
												}
											}
											else{
												var result={Station:stationId,StationOperator:x.StationOperator,RequestTimestamp:s,PeriodFrom:date_from,PeriodTo:date_to,NumberOfPasses:y.NumberOfPasses,Passlist:result2};
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
	});
}
router.get('/PassesPerStation/:stationID/:date_from/:date_to',passesPerStation);
module.exports=router;

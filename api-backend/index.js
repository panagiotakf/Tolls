const express=require('express')
var bodyParser = require('body-parser');
const fs = require('fs');
const key = fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./cert/CA/localhost/localhost.crt');
const app=express();
const port=9103;
var path= require('path');


app.get('/interoperability/api',(req,res, next) =>{
	res.send("hi love")
});

const https = require('https');
const server = https.createServer({ key, cert }, app);

server.listen(port,() =>{
	console.log('listening on port %d !',port);
});


app.use(bodyParser.json())
//app.post('/interoperability/api/admin/resetvehicles', (req, res, next)=> {
//  console.log(req.body);
//});


//declare all endpoints and load their files
const adminHealthCheck = require("./endpoints/AdminHealthCheck.js");
const adminResetPasses = require("./endpoints/AdminResetPasses.js");
const adminResetStations = require("./endpoints/AdminResetStations.js");
const adminResetVehicles = require("./endpoints/AdminResetVehicles.js");
//Non admin endpoints
const passesPerStation=require("./endpoints/PassesPerStation.js");
const passesAnalysis=require("./endpoints/PassesAnalysis.js");
const passesCost=require("./endpoints/PassesCost.js");
const chargesBy=require("./endpoints/ChargesBy.js");
const debts=require("./endpoints/Debts.js");
const debtAnalysis=require("./endpoints/DebtAnalysis.js");
const payoff=require("./endpoints/Payoff.js");
const lastPayment=require("./endpoints/LastPayment.js");



//bind all endpoints to app router
app.use('/interoperability/api', adminHealthCheck);
app.use('/interoperability/api', adminResetPasses);
app.use('/interoperability/api', adminResetStations);
app.use('/interoperability/api', adminResetVehicles);
//Non admin endpoints
app.use('/interoperability/api/',passesPerStation);
app.use('/interoperability/api/',passesAnalysis);
app.use('/interoperability/api/',passesCost);
app.use('/interoperability/api/',chargesBy);
app.use('/interoperability/api/', debts);
app.use('/interoperability/api/', debtAnalysis);
app.use('/interoperability/api/', payoff);
app.use('/interoperability/api', lastPayment);

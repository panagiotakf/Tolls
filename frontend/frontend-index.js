//this is the frontend's server code
const express = require("express");
const bodyparser = require("body-parser");
const port = 9102;
const app = express();
var path = require("path");

//middlewares
app.use(bodyparser.json())
app.set('view-engine', "ejs");
app.use(express.urlencoded({ extended: false }));

//initialize port
app.listen(port, () => {
  console.log("Server is running in port ", port)
});

//"get" for the html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend-index.html'));
});

//declare all frontend handlers and load their files
//Service
const passesPerStation = require("./frontendServices/PassesPerStation/frontend-PassesPerStation");
const passesAnalysis = require("./frontendServices/PassesAnalysis/frontend-PassesAnalysis");
const passesCost = require("./frontendServices/PassesCost/frontend-PassesCost");
const chargesBy = require("./frontendServices/ChargesBy/frontend-ChargesBy");
const lastPayment = require("./frontendServices/LastPayment/frontend-LastPayment");
const debts = require("./frontendServices/Debts/frontend-Debts");
const debtAnalysis = require("./frontendServices/DebtAnalysis/frontend-DebtAnalysis");
// //PSP
const payoff = require("./frontendPSP/Payoff/frontend-Payoff");
// //Admin
const healthCheck = require("./frontendAdmin/HealthCheck/frontend-HealthCheck");
const resetPasses = require("./frontendAdmin/ResetPasses/frontend-ResetPasses");
const resetStations = require("./frontendAdmin/ResetStations/frontend-ResetStations");
const resetVehicles = require("./frontendAdmin/ResetVehicles/frontend-ResetVehicles");

//bind all endpoints to app router
//Services
app.use('/interoperability/', passesPerStation);
app.use('/interoperability/', passesAnalysis);
app.use('/interoperability/', passesCost);
app.use('/interoperability/', chargesBy);
app.use('/interoperability/', lastPayment);
app.use('/interoperability/', debts);
app.use('/interoperability/', debtAnalysis);
// //PSP
app.use('/interoperability/', payoff);
// //Admin
app.use('/interoperability/admin/', healthCheck);
app.use('/interoperability/admin/', resetPasses);
app.use('/interoperability/admin/', resetStations);
app.use('/interoperability/admin/', resetVehicles);

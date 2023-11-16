pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});
const jsonData=pm.response.json(); 
var Station=pm.environment.get("Station");
var date_from=pm.environment.get("date_from");
var date_to=pm.environment.get("date_to");

pm.test("Right format of response",function(){
    pm.expect(jsonData.Station).to.be.a('string');
    pm.expect(jsonData.StationOperator).to.be.a('string');
    pm.expect(jsonData.RequestTimestamp).to.be.a('string');
    pm.expect(jsonData.PeriodFrom).to.be.a('string');
    pm.expect(jsonData.PeriodTo).to.be.a('string');
    pm.expect(jsonData.NumberOfPasses).to.be.a('number');
    pm.expect(jsonData.Passlist).to.be.a('array');
    pm.expect(jsonData.Passlist[0].PassIndex).to.be.a('number');
    pm.expect(jsonData.Passlist[0].PassID).to.be.a('string');
    pm.expect(jsonData.Passlist[0].PassTimeStamp).to.be.a('string');
    pm.expect(jsonData.Passlist[0].VehicleID).to.be.a('string');
    pm.expect(jsonData.Passlist[0].TagProvider).to.be.a('string');
    pm.expect(jsonData.Passlist[0].PassType).to.be.a('string');
    pm.expect(jsonData.Passlist[0].PassCharge).to.be.a('number');

});
if(Station=="NE02"&&date_from==20190101&&date_to==20190131){

    pm.test(" right answer", function () {
        pm.expect(jsonData.NumberOfPasses).to.eql(5);
    });

}


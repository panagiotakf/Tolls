pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

const jsonData=pm.response.json(); 

pm.test("Right format of response",function(){
    pm.expect(jsonData.op1_ID).to.be.a('string');
    pm.expect(jsonData.op2_ID).to.be.a('string');
    pm.expect(jsonData.RequestTimestamp).to.be.a('string');
    pm.expect(jsonData.PeriodFrom).to.be.a('string');
    pm.expect(jsonData.PeriodTo).to.be.a('string');
    pm.expect(jsonData.NumberOfPasses).to.be.a('number');
    pm.expect(jsonData.Passlist).to.be.a('array');
    pm.expect(jsonData.Passlist[0].PassIndex).to.be.a('number');
    pm.expect(jsonData.Passlist[0].PassID).to.be.a('string');
    pm.expect(jsonData.Passlist[0].StationID).to.be.a('string');
    pm.expect(jsonData.Passlist[0].TimeStamps).to.be.a('string');
    pm.expect(jsonData.Passlist[0].VehicleID).to.be.a('string');
    pm.expect(jsonData.Passlist[0].Charge).to.be.a('number');

});

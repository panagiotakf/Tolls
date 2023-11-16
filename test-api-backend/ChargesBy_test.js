pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

const jsonData=pm.response.json(); 
var op1_ID=pm.environment.get("op1_ID");
var date_from=pm.environment.get("date_from");
var date_to=pm.environment.get("date_to");

pm.test("Right format of response",function(){
    pm.expect(jsonData.op1_ID).to.be.a('string');
    pm.expect(jsonData.RequestTimestamp).to.be.a('string');
    pm.expect(jsonData.PeriodFrom).to.be.a('string');
    pm.expect(jsonData.PeriodTo).to.be.a('string');
    pm.expect(jsonData.PPOList).to.be.a('array');
    pm.expect(jsonData.PPOList[0].VisitingOperator).to.be.a('string');
    pm.expect(jsonData.PPOList[0].Charge).to.be.a('number');
    pm.expect(jsonData.PPOList[0].NumberofPasses).to.be.a('number');

});

if(op1_ID="aodos"&&date_from==20190401&&date_to==20190430){
    pm.test("ChargesBy right answer for aodos", function () {
        pm.expect(jsonData.PPOList[0].Charge).to.eql(30.8);
        pm.expect(jsonData.PPOList[1].Charge).to.eql(14);
        pm.expect(jsonData.PPOList[2].Charge).to.eql(19.6);
        pm.expect(jsonData.PPOList[3].Charge).to.eql(14);
        pm.expect(jsonData.PPOList[4].Charge).to.eql(14);
        pm.expect(jsonData.PPOList[5].Charge).to.eql(36.4);

    });
    
}

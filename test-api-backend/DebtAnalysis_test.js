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
    pm.expect(jsonData.PPOList[0].debt_from).to.be.a('number');
    

});

if(op1_ID="egnatia"&&date_from==20190901&&date_to==20190930){
    pm.test("DeptAnalysis right answer for egnatia", function () {
        pm.expect(jsonData.PPOList[0].debt_from).to.eql(-18.55);
        pm.expect(jsonData.PPOList[1].debt_from).to.eql(21.55);
        pm.expect(jsonData.PPOList[2].debt_from).to.eql(5);
        pm.expect(jsonData.PPOList[3].debt_from).to.eql(2.65);
        pm.expect(jsonData.PPOList[4].debt_from).to.eql(4.6);
        pm.expect(jsonData.PPOList[5].debt_from).to.eql(11.8);

    });
    
}

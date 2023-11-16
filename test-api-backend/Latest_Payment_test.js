pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

const jsonData=pm.response.json(); 

pm.test("Right format of response",function(){
    pm.expect(jsonData[0].operatorDebited).to.be.a('string');
    pm.expect(jsonData[0].latest_payment).to.be.a('string');
    

});

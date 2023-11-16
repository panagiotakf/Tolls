pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});//???????????

const jsonData=pm.response.json(); 
var op1_ID=pm.environment.get("op1_ID");
var op2_ID=pm.environment.get("op2_ID");
var date_from=pm.environment.get("date_from");
var date_to=pm.environment.get("date_to");




pm.test("Right format of response",function(){
    pm.expect(jsonData.op1_ID).to.be.a('string');
    pm.expect(jsonData.op2_ID).to.be.a('string');
    pm.expect(jsonData.RequestTimestamp).to.be.a('string');
    pm.expect(jsonData.PeriodFrom).to.be.a('string');
    pm.expect(jsonData.PeriodTo).to.be.a('string');
    pm.expect(jsonData.NumberOfPasses).to.be.a('number');
    pm.expect(jsonData.PassesCost).to.be.a('number');


});

if(op1_ID=="moreas"&&op2_ID=="olympia_odos"&&date_from==20201101&&date_to==20201130){

    pm.test("Olympia owns to Moreas in November 2020 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(13.55);
    });

}
if(op1_ID=="olympia_odos"&&op2_ID=="moreas"&&date_from==20201101&&date_to==20201130){

    pm.test("Moreas owns to Olympia in November 2020 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(16.4);
    });

}
if(op1_ID=="kentriki_odos"&&op2_ID=="olympia_odos"&&date_from==20190201&date_to==20190228){

    pm.test("Olympia owns to Kentriki in February 2019 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(5.1);
    });

}
if(op1_ID=="olympia_odos"&&op2_ID=="kentriki_odos"&&date_from==20190201&&date_to==20190228){

    pm.test("Kentriki owns to Olympia  in February 2019 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(8.5);
    });

}
if(op1_ID=="aodos"&&op2_ID=="gefyra"&&date_from==20200501&&date_to==20200531){

    pm.test("Gefyra owns to Aodos in May 2020 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(25.2);
    });

}
if(op1_ID=="gefyra"&&op2_ID=="aodos"&&date_from==20200501&&date_to==20200531){


    pm.test("Status code is 402", function () {
        pm.response.to.have.status(402);
    });
    

}
if(op1_ID=="egnatia"&&op2_ID=="gefyra"&&date_from==20200501&&date_to==20200531){

    pm.test("Gefyra owns to Egnatia in May 2020 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(2.25);
    });

}


if(op1_ID=="nea_odos"&&op2_ID=="aodos"&&date_from==20210101&&date_to==20210131){

    pm.test("Aodos owns to Nea_odos in January 2021 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(6.7);
    });

}
if(op1_ID=="aodos"&&op2_ID=="nea_odos"&&date_from==20210101&&date_to==20210131){

    pm.test("Nea_odos owns to Aodos in January 2021 right answer", function () {
        pm.expect(jsonData.PassesCost).to.eql(14.0);
    });

}


pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

const jsonData = pm.response.json();

pm.test("Right answer", function () {
    pm.expect(jsonData.status).to.eql('OK');
});


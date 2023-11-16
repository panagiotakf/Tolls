const express = require("express");
const router = express.Router();
var mysql = require('mysql2');
const csvtojson = require('csvtojson');
//var bodyParser = require('body-parser');


function adminResetVehicles(req, res) {
  var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "hachiko20005",
    database : "softengdb"
  });

  con.connect(function(err) {
    if (err) {
	    res.status(500).send({"status":"failed"});
	  }
    else{
	    //mysql queries
	    let myquery1 = "delete from tags";
	    con.query(myquery1, function (err, result, fields) {
		    if (err) {
			    res.status(500).send({"status":"failed"});


		    }
		    else{
	//    });
  //  }

 // });


			    const fileName = "vehicles.csv";
		            csvtojson().fromFile(fileName).then(source => {
		            // Fetching the data from each row
                           // and inserting to the table "sample"
                           for (var i = 0; i < source.length; i++) {
				   var string=source[i]['vehicleID;tagID;tagProvider;providerAbbr;licenseYear'];
				   var x=0;
				   for( var j=0; j<string.length;j++){
					   if(string[j]===";" && x===0){
						   var vehicleRef=string.slice(0,j);
						   x=1;
						   var y=j+1;
					   }
					   else if(string[j]===";" && x===1){
						   x=2;
						   y=j+1;
					   }
					   else if(string[j]===";" && x===2){
						   var providerId=string.slice(y,j);
						   break;
					   }
					   else{
						   continue;
					   }
				   }
				   // console.log(providerId);
			           var insertStatement = `INSERT INTO Tags values(?, ?)`;
			           var items = [vehicleRef, providerId];
                                   // Inserting data of current row into database
                                   con.query(insertStatement, items, (err, results, fields) => {
					   if (err) {
						   console.log(err);
						   res.status(500).send({"status":"failed"});
					   }
			   });
      }
          res.status(200).send({"status":"OK"});


	  });
	    }
    });
  }
});

}



router.post('/admin/resetvehicles', adminResetVehicles);
module.exports = router;

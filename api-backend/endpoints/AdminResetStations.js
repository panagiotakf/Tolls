const express = require("express");
const router = express.Router();
var mysql = require('mysql2');
const csvtojson = require('csvtojson');

function adminResetStations(req, res) {

  var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "hachiko20005",
    database : "softengdb"
  });

  con.connect(function(err) {
    if (err) {
      res.status(500).send({"status" : "failed"});
    } else {
      // mysql queries
      let myquery1 = "delete from station";
      con.query(myquery1, function(err, result, fields) {
        if (err) {
          res.status(500).send({"status" : "failed"});

        } else {

          //	    });
          //  }
          // });
          const fileName = "stations.csv";
          csvtojson().fromFile(fileName).then(source => {
            // Fetching the data from each row
            // and inserting to the table "sample"

            for (var i = 0; i < source.length; i++) {
              var string = source[i]['stationID;stationProvider;stationName'];
              var x = false;
              for (var j = 0; j < string.length; j++) {
                if (string[j] === ";" && !x) {
                  var stationRef = string.slice(0, j);
                  x = true;
                  var y = j + 1;
                }
                if (string[j] === ";" && x) {
                  var providerId = string.slice(y, j);
                  y = j + 1
                }
              }
              var stationName = string.slice(y, j + 1);
              // console.log(stationName);

              var insertStatement = `INSERT INTO Station values(?, ?, ?)`;
              var items = [ stationRef, providerId, stationName ];
              // Inserting data of current row
              // into database
              con.query(insertStatement, items,
                        (
                            err,
                            results,
                            fields,
                            ) => { // problem because query is asychronous
                          if (err) {
                            console.log(err);
                            res.status(500).send({"status" : "OK"});
                          }
                        });
            }
            res.status(200).send({"status" : "OK"});
          });
        }
      });
    }
  });
}

router.post('/admin/resetstations', adminResetStations);
module.exports = router;

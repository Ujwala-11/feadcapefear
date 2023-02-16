var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var fs = require('fs');
const sharp = require('sharp');
const dbconfig =require("../dbconfig");

router.post('/', (req, res, login) => {
        const user = {
            userid: req.body.userid,
            password: req.body.password,
        };
        console.log(user.userid);
        // console.log(user.password);
        const connection = mysql.createConnection({
          host: dbconfig.dbhost,
          user: dbconfig.dbusername,
          password: dbconfig.dbpassword,
          database: dbconfig.dbname
        });
        connection.connect();

        connection.query("SELECT ud.*,u.password FROM users u LEFT JOIN user_details ud ON u.user_id=ud.user_id WHERE u.user_id=? and u.password=?;",[user.userid,user.password], (err, rows, fields) => {
          
        if (err) throw err;
        
        if(rows.length==0){
          console.log("invalid credentials");
          res.send("invalid credentials");
        }else if(rows.length>1){
          console.log("multiple results");
          res.send("multiple results");
        }else{
          var rawData = fs.readFileSync(rows[0].image,'base64');
          rows[0].image=rawData;
          
          res.send(rows[0]);
            
        }
         });
        
        connection.end();
});

module.exports = router;
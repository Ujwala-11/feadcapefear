var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var fs = require('fs');
const dbconfig =require("../dbconfig");

router.get('/', (req, res) => {
    const status=req.query.status;
        const connection = mysql.createConnection({
            host: dbconfig.dbhost,
            user: dbconfig.dbusername,
            password: dbconfig.dbpassword,
            database: dbconfig.dbname
        });
        connection.connect();

        connection.query("SELECT * FROM user_details where status='"+status+"'", (err,data) => {
          
        if (err)
        throw err;  
        data.forEach(element => {      
            var rawdata =  fs.readFileSync(element.image,'base64');
            element.image = rawdata;
        });
            rows=JSON.stringify(data);
            res.send(rows);
        });
        
        connection.end();
    });
      
    module.exports = router;
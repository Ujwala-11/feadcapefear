var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const dbconfig =require("../dbconfig");

router.get('/', (req, res, login) => {
       
        const connection = mysql.createConnection({
            host: dbconfig.dbhost,
            user: dbconfig.dbusername,
            password: dbconfig.dbpassword,
            database: dbconfig.dbname
        });
        connection.connect();

        connection.query("SELECT * FROM organization_look_up", (err, rows, fields) => {
          
        if (err)
        throw err;
        var response = JSON.stringify(rows);
        console.log(response);
        res.send(response);
         });
        
        connection.end();
});

module.exports = router;
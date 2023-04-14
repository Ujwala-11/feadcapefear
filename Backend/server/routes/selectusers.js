var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var fs = require('fs');
const dbconfig =require("../dbconfig");

router.get('/', (req, res) => {
    const userid=req.query.userid;
        const connection = mysql.createConnection({
            host: dbconfig.dbhost,
            user: dbconfig.dbusername,
            password: dbconfig.dbpassword,
            database: dbconfig.dbname
        });
        connection.connect();

        connection.query("SELECT ud.*,c.* FROM user_details ud left join chat c on ud.user_id=c.from_user where user_id != '"+userid+"' and status=1 GROUP BY c.from_user  ORDER BY c.from_user DESC", (err,data) => {
          
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
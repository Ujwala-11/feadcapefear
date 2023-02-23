var express = require('express');
var router = express.Router();
var fs = require('fs');
const mysql = require('mysql')
const dbconfig =require("../dbconfig");

router.get('/', (req, res) => {
    const userid=req.query.userid;
    const postid=req.query.postid;
        const connection = mysql.createConnection({
            host: dbconfig.dbhost,
            user: dbconfig.dbusername,
            password: dbconfig.dbpassword,
            database: dbconfig.dbname
        });
        connection.connect();
        connection.query("SELECT c.*, ud.* FROM comments c left join user_details ud on c.user_id=ud.user_id where post_id='"+postid+"';", (err, rows, fields) => {
        if (err)
        throw err;
        
        rows.forEach(element => {      
            var rawdata =  fs.readFileSync(element.image,'base64');
            element.image = rawdata;
        });
        var response=JSON.stringify(rows);
            res.send(response);
            
         });
        
        connection.end();
});

module.exports = router;


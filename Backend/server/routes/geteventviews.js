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
        connection.query("SELECT i.*, ud.* FROM intrested_event i left join user_details ud on i.user_id=ud.user_id where events_id='"+postid+"' order by i.ie_id desc;", (err, rows, fields) => {
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


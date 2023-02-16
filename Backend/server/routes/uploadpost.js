var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var fs = require('fs');
const { response } = require('express');
const date = require('date-and-time');
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

        connection.query("SELECT p.post_id as postid,p.post_text,p.imageUpload,p.user_id,p.lat,p.longitude,p.time_stamp,p.post_type,p.org_id,ud.*, tab.likes,tab2.userlike FROM post p left join user_details ud on p.user_id=ud.user_id left join (SELECT COUNT(user_id) as likes,post_id FROM user_likes group by post_id) tab on p.post_id=tab.post_id left join (SELECT COUNT(user_id) as userlike,post_id FROM user_likes where user_id='"+userid+"' group by post_id) tab2 on p.post_id=tab2.post_id where p.org_id=0 order by p.post_id desc", (err,data) => {
        if (err)
        throw err;  
        data.forEach(element => { 
            var rawData = fs.readFileSync(element.imageUpload,'base64');
            element.imageUpload=rawData;     
            var rawdata2 =  fs.readFileSync(element.image,'base64');
            element.image = rawdata2;

        });
            rows=JSON.stringify(data);
                   
            res.send(rows);
        });
        connection.end();
    });
      
    module.exports = router;
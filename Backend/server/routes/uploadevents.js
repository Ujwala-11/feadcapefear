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

        connection.query("SELECT e.events_id as eventid,e.event_text,e.imageUpload,e.user_id,e.lat,e.longitude,e.time_stamp,e.event_end_date,e.event_end_time,e.imagetype,ud.*, tab.intrested,tab2.userintrested FROM events e left join user_details ud on e.user_id=ud.user_id left join (SELECT COUNT(user_id) as intrested,events_id FROM intrested_event group by events_id) tab on e.events_id=tab.events_id left join (SELECT COUNT(user_id) as userintrested,events_id FROM intrested_event where user_id='"+userid+"' group by events_id) tab2 on e.events_id=tab2.events_id order by e.events_id desc", (err,data) => {
        if (err)
        throw err;  
        data.forEach(element => { 
            if(element.imageUpload!=null){
                var rawData = fs.readFileSync(element.imageUpload,'base64');
                element.imageUpload=rawData;
            }
            var rawdata2 =  fs.readFileSync(element.image,'base64');
            element.image = rawdata2;

        });
            rows=JSON.stringify(data);
                   
            res.send(rows);
        });
        connection.end();
    });
      
    module.exports = router;
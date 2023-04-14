var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
const path = require('path');
var fs = require('fs');
const date = require('date-and-time');
const dbconfig =require("../dbconfig");

router.post('/', (req, res) => {
    let now = new Date();
    const value = date.format(now,'DD-MM-YYYY HH:mm:ss');
    var form = new formidable.IncomingForm();
    const connection = mysql.createConnection({
        host: dbconfig.dbhost,
        user: dbconfig.dbusername,
        password: dbconfig.dbpassword,
        database: dbconfig.dbname
    });

    form.parse(req,function(err, fields, files){
        const user = {
            posttext : fields.posttext,
            enddate : fields.enddate,
            endtime:fields.endtime,
            lat:fields.lat,
            long:fields.long,
            userid: fields.userid,
            imagetype: fields.imagetype,
        };
        var filename = files.image.originalFilename;
        var extension = filename.split(".").pop();
        var oldPath = files.image.filepath;
         var newPath = 'D:\\\\uploads\\\\'+user.userid+'_'+Date.now().toString()+'.'+extension;
        var rawData = fs.readFileSync(oldPath);
      
        fs.writeFile(newPath, rawData, function(err){
            connection.connect();

        connection.query("INSERT INTO events(user_id,imageUpload,event_text,time_stamp,lat,longitude,event_end_date,event_end_time,imagetype) VALUES('"+user.userid+"','"+newPath+"','"+user.posttext+"','"+value+"','"+user.lat+"','"+user.long+"','"+user.enddate+"','"+user.endtime+"','"+user.imagetype+"')", (err, rows, fields) => {
          
        if (err)
        throw err;

        console.log('Event with image inserted successfully for '+user.userid);
        res.send('post created')
        });
        connection.end();
           
        })

    });
});

module.exports = router;
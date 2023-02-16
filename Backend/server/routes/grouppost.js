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
            posttype : fields.posttype,
            userid: fields.userid,
            lat:fields.lat,
            long:fields.long,
            orgid: fields.organizationid,
        };

        var filename = files.image.originalFilename;
        var extension = filename.split(".").pop();
        var oldPath = files.image.filepath;
         var newPath = 'D:\\\\uploads\\\\'+user.userid+'_'+Date.now().toString()+'.'+extension;
        var rawData = fs.readFileSync(oldPath);
      
        fs.writeFile(newPath, rawData, function(err){
            connection.connect();

        connection.query("INSERT INTO post(user_id,imageUpload,post_text,post_type,org_id,time_stamp,lat,longitude) VALUES('"+user.userid+"','"+newPath+"','"+user.posttext+"','"+user.posttype+"','"+user.orgid+"','"+value+"','"+user.lat+"','"+user.long+"')", (err, rows, fields) => {
          
        if (err)
        throw err;
        console.log(rows);

        console.log('Data inserted successfully for '+user.userid);
        res.send('post created')
        });
        connection.end();
           
        })

    });
});

module.exports = router;
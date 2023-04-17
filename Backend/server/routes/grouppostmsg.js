var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
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

        connection.connect();

        connection.query("INSERT INTO post(user_id,post_text,post_type,org_id,time_stamp,lat,longitude) VALUES('"+user.userid+"','"+user.posttext+"','"+user.posttype+"','"+user.orgid+"','"+value+"','"+user.lat+"','"+user.long+"')", (err, rows, fields) => {
        if (err)
        throw err;
        console.log('post with msg inserted successfully for '+user.userid);
        res.send('post created')
        });
        connection.end();
    });
});

module.exports = router;
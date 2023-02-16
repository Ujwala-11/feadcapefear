var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
const dbconfig =require("../dbconfig");

router.post('/', (req, res, next) => {
        
    var form = new formidable.IncomingForm();
    const connection = mysql.createConnection({
        host: dbconfig.dbhost,
        user: dbconfig.dbusername,
        password: dbconfig.dbpassword,
        database: dbconfig.dbname
    });

    form.parse(req,function(err, fields, files){
        const user = {
           comment:fields.commentsend,
           userid:fields.userid,
           postid:fields.postid,
           timestamp:fields.timestamp
        };
        connection.connect();

        connection.query("INSERT INTO comments(comments,user_id,post_id,time_stamp) VALUES('"+user.comment+"','"+user.userid+"','"+user.postid+"','"+user.timestamp+"')", (err, rows) => {
        if (err)
        throw err;
        console.log('Data inserted successfully for '+user.userid);
        res.send(rows[0]);
        
        });
    });
});

module.exports = router;
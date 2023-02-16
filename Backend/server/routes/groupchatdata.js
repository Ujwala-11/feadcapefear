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
           message:fields.chatsend,
           userid:fields.sender,
           orgid:fields.orgid,
           timestamp:fields.timestamp
        };
        connection.connect();

        connection.query("INSERT INTO group_chat(group_id,user_id,message,time_stamp) VALUES('"+user.orgid+"','"+user.userid+"','"+user.message+"','"+user.timestamp+"')", (err, rows, fields) => {
          
        if (err)
        throw err;

        console.log('Data inserted successfully for '+user.userid);
        res.send(rows[0]);
        
        });
    });
});

module.exports = router;
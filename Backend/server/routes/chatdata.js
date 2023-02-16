var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
const dbconfig = require('../dbconfig')
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
           to_user:fields.sender,
           from_user:fields.reciever,
           timestamp:fields.timestamp
        };
        connection.connect();

        connection.query("INSERT INTO chat(from_user,to_user,message,time_stamp) VALUES('"+user.from_user+"','"+user.to_user+"','"+user.message+"','"+user.timestamp+"')", (err, rows, fields) => {
          
        if (err)
        throw err;

        console.log('Data inserted successfully for '+user.userid);
        res.send(rows[0]);
        
        });
    });
});

module.exports = router;
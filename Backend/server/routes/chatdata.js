var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
const path = require('path');
var fs = require('fs');
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
           timestamp:fields.timestamp,
           type:fields.type,
           imagetype:fields.imagetype,
        };
        var filename = files.image.originalFilename;
        var extension = filename.split(".").pop();
        var oldPath = files.image.filepath;
         var newPath = 'D:\\\\uploads\\\\'+user.userid+'_'+Date.now().toString()+'.'+extension;
        var rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, function(err){
        connection.connect();
        
            connection.query("INSERT INTO chat(from_user,to_user,message,time_stamp,type,chatimage,imagetype) VALUES('"+user.from_user+"','"+user.to_user+"','"+user.message+"','"+user.timestamp+"','"+user.type+"','"+newPath+"','"+user.imagetype+"')", (err, rows, fields) => {
          
                if (err)
                throw err;
        
                console.log('Data inserted successfully for '+user.to_user);
                res.send(rows[0]);
                
                });
             connection.end();
        })
    });
});

module.exports = router;
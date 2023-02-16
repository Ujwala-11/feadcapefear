var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
const path = require('path');
var fs = require('fs');
const dbconfig =require("../dbconfig");

router.post('/', (req, res) => {
   
    const connection = mysql.createConnection({
        host: dbconfig.dbhost,
        user: dbconfig.dbusername,
        password: dbconfig.dbpassword,
        database: dbconfig.dbname
    });

        connection.connect();

        connection.query("INSERT INTO vote(user_id,post_id,vote,time_stamp,) VALUES('"+user.userid+"','"+user.posttext+"','"+user.posttype+"','"+user.orgid+"')", (err, rows, fields) => {
          
        if (err)
        throw err;
        console.log(rows);

        console.log('Data inserted successfully for '+user.userid);
        res.send('post created')
        });
        connection.end();
           
        })

module.exports = router;
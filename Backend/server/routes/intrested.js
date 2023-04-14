var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
const path = require('path');
var fs = require('fs');
const date = require('date-and-time');
const dbconfig =require("../dbconfig");

router.post('/', (req, res) => {
    const reqparams={
        postid:req.body.postid,
        userid:req.body.userid,
        date:req.body.date,
    }
    console.log(reqparams);
    const connection = mysql.createConnection({
        host: dbconfig.dbhost,
        user: dbconfig.dbusername,
        password: dbconfig.dbpassword,
        database: dbconfig.dbname
    });
    connection.connect();

        connection.query("INSERT INTO intrested_event(events_id,user_id,time_stamp,status) VALUES(?,?,?,?)",[reqparams.postid,reqparams.userid,reqparams.date,0], (err, rows, fields) => {
          
        if (err)
        throw err;

        res.send('Intrested')
        });
        connection.end();
           
        })

  


module.exports = router;

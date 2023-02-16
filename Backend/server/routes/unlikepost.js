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
        userid:req.body.userid
    }
    console.log(reqparams);
    const connection = mysql.createConnection({
        host: dbconfig.dbhost,
        user: dbconfig.dbusername,
        password: dbconfig.dbpassword,
        database: dbconfig.dbname
    });
    connection.connect();

        connection.query("DELETE from user_likes WHERE post_id=? AND user_id=?",[reqparams.postid,reqparams.userid], (err, rows, fields) => {
          
        if (err)
        throw err;

        res.send('unliked')
        });
        connection.end();
           
        })

  


module.exports = router;

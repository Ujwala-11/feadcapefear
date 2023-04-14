var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const path = require('path');
var fs = require('fs');
const dbconfig =require("../dbconfig");

router.get('/', (req, res) => {
    const userid=req.query.userid;
    const recid=req.query.recieverid;
    if(recid){
        const connection = mysql.createConnection({
            host: dbconfig.dbhost,
            user: dbconfig.dbusername,
            password: dbconfig.dbpassword,
            database: dbconfig.dbname
        });
        connection.connect();
        connection.query("SELECT * FROM chat where from_user IN('"+userid+"','"+recid+"') and to_user IN('"+userid+"','"+recid+"');", (err, rows, fields) => {
          
        if (err)
        throw err;
        rows.forEach(element => {
            if(element.type==0){
                var rawData = element.chatimage;
                element.chatimage="";
            }else{
                var rawData = fs.readFileSync(element.chatimage,'base64');
                element.chatimage=rawData; 
            }
        });
        var response=JSON.stringify(rows);
        res.send(response);
            
         });
        
        connection.end();
    }else{
        res.send("no recieverid");
    }
});

module.exports = router;
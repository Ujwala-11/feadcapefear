var express = require('express');
var router = express.Router();
const mysql = require('mysql')
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
        var response=JSON.stringify(rows);
        res.send(response);
            
         });
        
        connection.end();
    }else{
        res.send("no recieverid");
    }
});

module.exports = router;
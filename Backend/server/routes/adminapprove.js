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
           userid:fields.userid,
        };
        connection.connect();

        connection.query("UPDATE user_details SET status = 1 WHERE user_id='"+user.userid+"'", (err, rows) => {
        if (err)
        throw err;
        res.send(rows[0]);
        
        });
    });
});

module.exports = router;

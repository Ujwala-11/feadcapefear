var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const dbconfig =require("../dbconfig");

router.get('/', (req, res) => {
    const userid=req.query.userid;
    const orgid=req.query.orgid
        const connection = mysql.createConnection({
            host: dbconfig.dbhost,
            user: dbconfig.dbusername,
            password: dbconfig.dbpassword,
            database: dbconfig.dbname
        });
        connection.connect();
        connection.query("SELECT gc.*, ud.* FROM group_chat gc left join user_details ud on gc.user_id=ud.user_id where group_id='"+orgid+"' ", (err, rows, fields) => {
        if (err)
        throw err;
        console.log(rows)
        var response=JSON.stringify(rows);
        res.send(response);
            
         });
        
        connection.end();
});

module.exports = router;
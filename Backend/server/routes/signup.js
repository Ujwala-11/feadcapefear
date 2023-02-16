var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var formidable = require('formidable');
const path = require('path');
var fs = require('fs');
const sharp = require('sharp');
const metadata = require('express-metadata');
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
            userid:'',
            firstname: fields.firstname,
            lastname: fields.lastname,
            organizationid:fields.org_id,
            organizationname:fields.org_name,
            password:fields.password,
            role:'USER',
            status:0
        };
        var letter=user.organizationname.split('')[0].toUpperCase();
        var letter2=user.firstname.split('')[0].toUpperCase();
        var letter3=user.lastname.split('')[0].toUpperCase();
        var val = Math.floor(1000 + Math.random() * 9000);
        console.log(val);
        user.userid='FCF'+letter+letter2+letter3+val;

        var filename = files.image.originalFilename;
        var extension = filename.split(".").pop();
        var oldPath = files.image.filepath;
        var newPath = 'D:\\\\uploads\\\\'+user.userid+'_'+Date.now().toString()+'.'+extension;
        var filetoresize = 'D:\\\\uploads\\\\resized.'+extension;
        var rawData = fs.readFileSync(oldPath);

        
        fs.writeFile(newPath, rawData, function(err){
            if(err) throw err; 
        })
        sharp(oldPath).resize({ width: 1040 })
        .withMetadata()
        .toFile(newPath)
        .then(function(newFileInfo) {
                console.log("Successfully resized "+newFileInfo.size);
            })
            .catch(function(err1) {
                console.log(err1);
            });
        connection.connect();

        connection.query("INSERT INTO user_details(user_id,image,firstname,lastname,organization_id,organization_name,role,status) VALUES('"+user.userid+"','"+newPath+"','"+user.firstname+"','"+user.lastname+"','"+user.organizationid+"','"+user.organizationname+"','"+user.role+"',"+user.status+")", (err, rows, fields) => {
          
        if (err)
        throw err;

        console.log('Data inserted successfully for '+user.userid);
        
        });
        connection.query("INSERT INTO users(user_id,password) VALUES('"+user.userid+"','"+user.password+"')", (err, rows, fields) => {
          
            if (err)
            throw err;
    
            console.log('Data inserted successfully for '+user.userid);
            res.send(user);
            
        });
        connection.end();
    });
});

module.exports = router;
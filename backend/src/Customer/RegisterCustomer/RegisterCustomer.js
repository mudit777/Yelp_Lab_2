var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")


main().catch(console.error);

exports.RegisterCustomer = (req, res) => {
    var getUsers = "SELECT * from user_table WHERE email = '"+ req.body.email +"'";
    connection.query(getUsers, (err, user) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(user.length > 0)
        {
            res.writeHead(299, {
                "Content-Type" : "text/plain"
            })
            res.end("User exists")
        }
        else{
            const now = new Date();
            var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
            datetime = datetime.substring(0, datetime.indexOf(" "));
            var encryptedPassword = ""
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                // Store hash in your password DB.
                console.log(hash)
                encryptedPassword = hash
            });
            setTimeout(function(){
                var entry = "INSERT INTO `Yelp`.`user_table` (`first_name`, `last_name`, `email`, `password`, `zip_code`, `day`, `month`, `year`, `user_type`, `yelping_since`) VALUES ('"+ req.body.first_name+"', '"+ req.body.last_name +"', '" + req.body.email +"', '"+ encryptedPassword +"', '"+ req.body.zip_code +"', '"+ req.body.day +"', '"+ req.body.month +"', '"+ req.body.year +"', '"+ req.body.user_type +"', '"+ datetime +"');"
                connection.query(entry, function(err, result){
                    if(err)
                    {
                        console.log(err)
                        res.writeHead(500, {
                            "Content-Type" : "text/plain"
                        })
                        res.end("Server Side Error")
                    }
                    res.writeHead(200, {
                        "Content-Type" : "text/plain"
                    })
                    res.end("User Registered")
                });
            }, 1000)
        }
    })
    
   
    
}
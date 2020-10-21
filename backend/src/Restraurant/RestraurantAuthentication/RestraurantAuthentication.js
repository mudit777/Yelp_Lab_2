var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")

exports.registerRestraurant = (req, res) => {
    var getRestrau = "SELECT * FROM restraurant_table WHERE email = '"+ req.body.email +"'";
    connection.query(getRestrau, (err, restraurant) =>{
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(restraurant.length > 0)
        {
            res.writeHead(299,{
                'Content-Type' : 'text/plain'
            })
            res.end("Restraurant exists");
        }
        else {
            var encryptedPassword = ""
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                encryptedPassword = hash
            });
            setTimeout(function(){
                req.body['password'] = encryptedPassword
                // var entry = "INSERT INTO `Yelp`.`restraurant_table` (`owner_name`,  `email`, `password`, `zip_code`, `restraurant_name`, `location`, `neighborhood`) VALUES ('"+ req.body.owner_name+"', '" + req.body.email +"', '"+ encryptedPassword +"', '"+ req.body.zip_code +"', '"+ mysql.escape(req.body.restraurant_name) +"', '"+ req.body.location +"', '"+ req.body.neighborhood +"');"
                var query = "INSERT INTO `Yelp`.`restraurant_table` SET " + mysql.escape(req.body);
                connection.query(query, function(err, result){
                    if(err)
                    {
                        console.log(err)
                        res.writeHead(500, {
                            "Content-Type" : "text/plain"
                        })
                        res.end("Server Side Error")
                    }
                });
            }, 1000)
            res.end("Successful Registration");
        }
    })
    
}

exports.restraurantSignIn = (req, res) => {
    var query = "SELECT * FROM restraurant_table WHERE email = '"+ req.body.email +"'";
    user = {}
    connection.query(query, function(err, result){
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result.length === 0)
        {
            res.writeHead(500,{
                'Content-Type' : 'text/plain'
            })
            res.end("Invalid user");
        }
        else{
            var isPasswordTrue = false;
            setTimeout(function(){
                bcrypt.compare(req.body.password, result[0].password, function(err, isPasswordTrue) {
                    if(err)
                    {
                        console.log(err)
                        res.writeHead(500, {
                            "Content-Type" : "text/plain"
                        })
                        res.end("Server Side Error")
                    }
                    if(req.body.email === result[0].email && isPasswordTrue)
                    {
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                        delete result[0].password;
                        res.writeHead(200,{
                            'Content-Type' : 'applicaton/json'
                        })
                        res.end(JSON.stringify(result[0].restraurant_id));
                    }
                    if(!isPasswordTrue)
                    {
                        res.writeHead(500,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid user");
                    }
                });
               
            }, 500)
        }
    });
}
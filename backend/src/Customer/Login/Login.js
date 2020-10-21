var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")


exports.customerSignIn = (req, res) => {
    var query = "SELECT * FROM user_table WHERE email = '"+ req.body.email +"'";
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
            res.writeHead(207,{
                'Content-Type' : 'text/plain'
            })
            res.end("Invalid user");
        }
        else{
           
            // var isPasswordTrue = false;
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
                    console.log(isPasswordTrue)
                    if(req.body.email === result[0].email && isPasswordTrue)
                    {
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                        delete result[0].password;
                        res.writeHead(200,{
                            'Content-Type' : 'applicaton/json'
                        })
                        res.end(JSON.stringify(result[0]));
                    }
                    if(!isPasswordTrue)
                    {
                        res.writeHead(209,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Wrong Password");
                    }
                });
               
            }, 500)
        }
    });
}

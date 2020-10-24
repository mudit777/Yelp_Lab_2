var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")
var Customers = require('../../../Models/userModel')
var kafka = require('../../../kafka/client')

exports.customerSignIn = (req, res) => {
    kafka.make_request("customer_sign_in", req.body, (err, result) => {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("callback is ________________________", result);
            if(result === 500)
            {
                res.writeHead(500, {
                    "Content-Type" : "text/plain"
                })
                res.end("Server Side Error")
            }
            else if(result === 207)
            {
                res.writeHead(207,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid user");
            }
            else if(result === 209)
            {
                res.writeHead(209,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Wrong Password");
            }
            else{
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                delete result.password;
                res.writeHead(200,{
                    'Content-Type' : 'applicaton/json'
                })
                res.end(JSON.stringify(result));
            }
        }
    })
    // Customers.findOne({email : req.body.email}, (err, result) => {
    //     if(err)
    //     {
    //         console.log(err)
    //         res.writeHead(500, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     else if(result === null)
    //     {
    //         res.writeHead(207,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Invalid user");
    //     }
    //     else{
    //         bcrypt.compare(req.body.password, result.password, function(err, isPasswordTrue) {
    //             if(err)
    //             {   
    //                 console.log(err)
    //                 res.writeHead(500, {
    //                     "Content-Type" : "text/plain"
    //                 })
    //                 res.end("Server Side Error")
                    
    //             }
    //             console.log(isPasswordTrue)
    //             if(req.body.email === result.email && isPasswordTrue)
    //             {
    //                 res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
    //                 delete result.password;
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'applicaton/json'
    //                 })
    //                 res.end(JSON.stringify(result));
    //             }
    //             if(!isPasswordTrue)
    //             {
    //                 res.writeHead(209,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 res.end("Wrong Password");
    //             }
    //         });
            
    //     }
    // })
    // var query = "SELECT * FROM user_table WHERE email = '"+ req.body.email +"'";
    // connection.query(query, function(err, result){
    //     if(err)
    //     {
    //         console.log(err)
    //         res.writeHead(500, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     if(result.length === 0)
    //     {
    //         res.writeHead(207,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Invalid user");
    //     }
    //     else{
    //         setTimeout(function(){
    //             bcrypt.compare(req.body.password, result[0].password, function(err, isPasswordTrue) {
    //                 if(err)
    //                 {
                        
    //                     console.log(err)
    //                     res.writeHead(500, {
    //                         "Content-Type" : "text/plain"
    //                     })
    //                     res.end("Server Side Error")
                        
    //                 }
    //                 console.log(isPasswordTrue)
    //                 if(req.body.email === result[0].email && isPasswordTrue)
    //                 {
    //                     res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
    //                     delete result[0].password;
    //                     res.writeHead(200,{
    //                         'Content-Type' : 'applicaton/json'
    //                     })
    //                     res.end(JSON.stringify(result[0]));
    //                 }
    //                 if(!isPasswordTrue)
    //                 {
    //                     res.writeHead(209,{
    //                         'Content-Type' : 'text/plain'
    //                     })
    //                     res.end("Wrong Password");
    //                 }
    //             });
               
    //         }, 500)
    //     }
    // });
}

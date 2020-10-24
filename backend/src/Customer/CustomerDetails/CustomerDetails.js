var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")
var Customers = require("../../../Models/userModel")
const {ObjectId} = require('mongodb');
var kafka = require('../../../kafka/client')

exports.getCustomerDetails = (req, res) => {
    kafka.make_request('get_customer_details', req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else
        {
            console.log("--------------------------Call back result is --------------------",result);
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result));
        }
    })
}

exports.updateCustomerDetails = (req, res) => {
    kafka.make_request("update_customer_details", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Updated Info");
        }
    })
    // Customers.updateOne({_id : ObjectId(req.body.user_id)}, { $set : {
    //     first_name : req.body.first_name,
    //     last_name : req.body.last_name,
    //     email : req.body.email,
    //     phone_number : req.body.phone_number,
    //     nick_name : req.body.nick_name,
    //     birth_day : req.body.birth_day,
    //     headline :  req.body.headline, 
    //     city : req.body.city, 
    //     state : req.body.state,
    //     country : req.body.country,
    //     zip_code : req.body.zip_code, 
    //     things_i_love : req.body.things_i_love, 
    //     blog : req.body.blog, 
    //     favourites : req.body.favourites, 
    //     address :  req.body.address
    // }}, (err, result) => {
    //     if(err)
    //     {
    //         console.log(err)
    //         res.writeHead(500, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     else{
    //         console.log(result)
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Updated Info");
    //     }
    // })
}
exports.uploadProfileImage =  function(req, res){
    req.body["path"] = req.file.path;
    console.log(req.file.path)
    console.log("user id is", req.body.UserId)
    kafka.make_request("upload_profile_image", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            
            res.end("Server Side Error")
        }
        else {
            res.end(JSON.stringify(req.file))
        }
    })
    // Customers.updateOne({_id : ObjectId(req.body.UserId)}, {$set : {
    //     profile_photo : req.file.path
    // }}, (err, result) => {
    //     if(err)
    //     {
    //         console.log(err)
    //         res.writeHead(500, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     if(result)
    //     {

    //     }
    //     res.end(JSON.stringify(req.file))
    // })
}
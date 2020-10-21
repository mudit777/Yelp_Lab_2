var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")

exports.getCustomerDetails = (req, res) => {
    console.log(req.body)
    var query = "SELECT * FROM user_table WHERE user_id = '"+ req.body.UserId +"'";
    connection.query(query, function(err, result){
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result)
        {
            // delete result[0].password;
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result[0]));
        }
    })
}

exports.updateCustomerDetails = (req, res) => {
    // yelping_since = '"+ req.body.yelping_since +"' ,
    var query = "UPDATE user_table SET first_name = '"+ req.body.first_name +"' , last_name = '"+ req.body.last_name +"' , email = '"+ req.body.email +"' , phone_number = '"+ req.body.phone_number +"' , nick_name = '"+ req.body.nick_name +"' ,  birth_day = '"+ req.body.birth_day +"', headline = '"+ req.body.headline +"' , city = '" + req.body.city +"' , state = '" + req.body.state +"' , country = '"+ req.body.country +"' , zip_code = '"+ req.body.zip_code +"' , things_i_love = '"+ req.body.things_i_love +"' , blog = '"+ req.body.blog +"' , favourites = '"+req.body.favourites +"', address = '"+ req.body.address +"' WHERE user_id = '"+ req.body.user_id +"'";
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Updated Info");
    })
}
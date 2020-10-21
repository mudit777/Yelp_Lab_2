var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let connection = require("../../../database");


exports.getRestraurantReviews = (req, res) => {
    var query = "SELECT * FROM review_table WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
    connection.query(query, (err, result) => {
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
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
}
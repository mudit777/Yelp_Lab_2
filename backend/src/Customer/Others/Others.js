var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database")

exports.getAllRestraurants = (req, res) => {
    var query = "SELECT * FROM `Yelp`.`restraurant_table`;";
    connection.query(query, function (err, result) {
        if (err) {
        res.writeHead(500, {
            "Content-Type": "text/plain",
        });
        res.end("Error");
        } 
        else {
            
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(result));
            console.log(result)
        }
    });
}
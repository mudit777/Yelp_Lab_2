var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let connection = require("../../../database");


exports.addEvent = (req, res) => {
    var query = "INSERT INTO `Yelp`.`event_table` SET " + mysql.escape(req.body);
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
                'Content-Type' : 'text/plain'
            })
            res.end("Event added")
        }
    })
}

exports.getRestraurantEvents = (req, res) => {
    var query = "SELECT * FROM event_table WHERE restraurant_id =  '"+ req.body.restraurant_id +"'";
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

exports.getUsersOfAnEvent = (req, res) => {
    var query  =  "SELECT * FROM user_table WHERE user_id IN (SELECT user_id FROM event_registration_table WHERE event_id = '"+ req.body.event_id +"')"
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        // if(result)
        else
        {
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
}
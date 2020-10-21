var express = require('express');
var router = express.Router();
const date = require('date-and-time');
var mysql = require('mysql');
let connection = require("../../../database");

exports.getAllEvents = (req, res) => {
    var query = "SELECT * FROM event_table"
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

exports.registerForAnEvent = (req, res) => {
    var initialQuery = "SELECT * FROM event_registration_table WHERE event_id = '"+ req.body.event_id +"' AND user_id = '"+ req.body.user_id +"'";
    connection.query(initialQuery, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result.length > 0)
        {
            res.writeHead(299, {
                'Content-Type' : 'text/plain'
            })
            res.end("User Already registered")
        }
        if(result.length === 0)
        {
            const now = new Date();
            var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
            var query = "INSERT INTO `Yelp`.`event_registration_table` (`event_id`,`user_id`,`restraurant_id`, `registration_time`) VALUES ('"+ req.body.event_id +"', '" + req.body.user_id +"', '"+ req.body.restraurant_id +"', '"+ datetime +"');";
            connection.query(query, (err, event) => {
                if(err)
                {
                    console.log(err)
                    res.writeHead(500, {
                        "Content-Type" : "text/plain"
                    })
                    res.end("Server Side Error")
                }
                if(event)
                {
                    res.writeHead(200, {
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Registered to event")
                }
            })    
        }
    })
   
}

exports.getUserEvents = (req, res) => {
    var query = "SELECT * FROM event_table WHERE event_id IN (SELECT event_id FROM event_registration_table WHERE user_id = '"+ req.body.user_id +"')"
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

exports.searchEvents = (req, res) => {
    var query = "SELECT * from event_table where lower(REPLACE(event_name, ' ', '')) LIKE lower(REPLACE('%"+req.body.search+"%', ' ', ''))"
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
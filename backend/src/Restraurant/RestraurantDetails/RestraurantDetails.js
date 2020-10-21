var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database")

exports.getRestraurantDetails = (req, res) => {
    var query = "SELECT * FROM restraurant_table WHERE restraurant_id = '"+ req.body.RestrauId +"'";
    connection.query(query, (err, result) => {
        if(err)
        {
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
};

exports.updateRestraurantDetails = (req, res) => {
    var query = "UPDATE restraurant_table SET owner_name = '"+ req.body.owner_name +"', email = '"+ req.body.email +"' , phone_number = '"+ req.body.phone_number +"' , restraurant_name = '"+ req.body.restraurant_name +"', description = '"+ req.body.description +"' , location = '"+ req.body.location +"' , zip_code = '"+ req.body.zip_code +"' , weekdays_timings = '"+ req.body.weekdays_timings +"' , weekend_timings = '"+req.body.weekend_timings +"' , cusine = '"+ req.body.cusine +"' , takeout= '"+ req.body.takeout +"' , delivery = '"+ req.body.delivery +"' , dine_in = '"+ req.body.dine_in +"' WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
    // var query = "UPDATE restraurant_table SET '"+ mysql.escape(req.body) +"' WHERE restraurant_id = '"+ req.body.restraurant_id +"' "  ;
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
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Updated Info");
        }
        
    })
};
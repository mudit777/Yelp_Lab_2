var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const date = require('date-and-time');
let connection = require("../../../database")

exports.placeOrder = (req, res) => {
    const now = new Date();
    var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    var items = req.body.items.toString()
    var query = "INSERT INTO `Yelp`.`order_table` (`user_id`,  `restraurant_id`, `items`, `status`, `amount`, `time_placed`, `order_type`) VALUES ('"+ req.body.user_id+"', '" + req.body.restraurant_id +"', '"+ req.body.items +"', '"+ req.body.status +"', '"+ req.body.amount +"' , '"+ datetime +"' , '"+ req.body.order_type +"');";
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
            for(var item in req.body.items)
            {
                var is_active = 'no';
                var updateQuery = "UPDATE cart_table SET is_active = '"+ is_active +"' WHERE cart_id = '"+ req.body.items[item] +"'";
                connection.query(updateQuery, (Err, newResult) => {
                    if(Err) throw err;
                })
            }
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end("Order Placed")
        }
    })
}

exports.getCustomerOrders = (req, res) => {
    var query = "SELECT * FROM order_table WHERE user_id = '"+ req.body.user_id +"';";
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(499, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
           
    })
}

exports.filterCustomerOrders = (req, res) => {
    var query = "SELECT * FROM order_table WHERE user_id = '"+ req.body.user_id +"' AND status = '"+ req.body.filter +"'"
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(404, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
}
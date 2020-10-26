const e = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database");
var kafka = require("../../../kafka/client");

exports.getRestraurantOrders = (req, res) => {
    kafka.make_request("get_restraurant_orders", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data));
        }
    })
}

exports.updateOrderStatus = (req, res) => {
    kafka.make_request("update_order_status", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end("Status Updated")
        }
    })
}

exports.filterRestraurantOrders = (req, res) => {
    var query = "";
    var current = [
        'delivered',
        'picked up'
    ]
    switch(req.body.filter)
    {
        case "current":
            current = [
                'delivered',
                'picked up',
                'canceled'
            ]
            query = "SELECT * FROM order_table WHERE restraurant_id = '"+ req.body.restraurant_id +"' AND status  NOT IN ("+ mysql.escape(current) +")";
            break;
        case "past" :
            query = "SELECT * FROM order_table WHERE restraurant_id = '"+ req.body.restraurant_id +"' AND status In ("+ mysql.escape(current) +")";
            break;
        case "currentDelivery":
            current = [
                'delivered',
                'picked up',
                'canceled'
            ]
            var mode = 'delivery'
            query = "SELECT * FROM order_table WHERE restraurant_id = '"+ req.body.restraurant_id +"' AND order_type = '"+ mode +"'  AND status  NOT IN ("+ mysql.escape(current) +")";
            break;
        case "currentTakeout":
            current = [
                'delivered',
                'picked up',
                'canceled'
            ]
            var mode = 'takeout'
            query = "SELECT * FROM order_table WHERE restraurant_id = '"+ req.body.restraurant_id +"' AND order_type = '"+ mode +"'  AND status  NOT IN ("+ mysql.escape(current) +")";
            break;   
        case "pastDelivery":
            var mode = 'delivery'
            query = "SELECT * FROM order_table WHERE restraurant_id = '"+ req.body.restraurant_id +"' AND order_type = '"+ mode +"'  AND status IN ("+ mysql.escape(current) +")";
            break;
        case "pastTakeout":
            var mode = 'takeout'
            query = "SELECT * FROM order_table WHERE restraurant_id = '"+ req.body.restraurant_id +"' AND order_type = '"+ mode +"'  AND status IN ("+ mysql.escape(current) +")";
            break; 
        case "canceled":
            var mode = 'canceled'
            query = "SELECT * FROM order_table WHERE restraurant_id = '"+ req.body.restraurant_id +"' AND status = '"+ mode +"'"
    }
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
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
}
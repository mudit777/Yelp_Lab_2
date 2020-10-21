var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database")

exports.addItemToCart = (req, res) => {
    console.log(req.body)
    var isActive = 'yes';
    var query = "INSERT INTO `Yelp`.`cart_table` (`dish_id`,  `restraurant_id`, `user_id`, `quantity`, `is_active`) VALUES ('"+ req.body.dish_id+"', '" + req.body.restraurant_id +"', '"+ req.body.user_id +"', '"+ req.body.quantity +"', '"+ isActive +"');"
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
            res.end("Item Inserted")
        }
    })
}

exports.getUserCartDetails = (req, res) => {
    var isActive = 'yes'
    var query = "SELECT * from cart_table WHERE user_id = '"+ req.body.user_id +"' AND is_active = '"+ isActive +"' ";
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

exports.deleteCartItem = (req, res) => {
    var query = "DELETE FROM cart_table WHERE cart_id = '"+ req.body.cart_id +"' ";
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
            res.end("Item Deleted")
        }
       
    })
}

exports.setCartItemQuantity = (req, res) => {
    var query = "UPDATE cart_table SET quantity = '"+ req.body.quantity +"' WHERE cart_id = '"+ req.body.cart_id +"'";
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
            res.end("Quantity Updated")
        }
       
    })
}

exports.getCartItemDetails = (req, res) => {
    var query = "SELECT * FROM cart_table WHERE cart_id = '"+ req.body.cart_id +"'";
    connection.query(query, (err, result) => {
        if(err) throw err;
        if(result)
        {
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result[0]));
        }
    })
}
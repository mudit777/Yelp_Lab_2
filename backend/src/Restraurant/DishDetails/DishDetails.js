var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database")


exports.addDish = (req, res) => {
    var entry = "INSERT INTO `Yelp`.`dish_table` (`restraurant_id`,  `dish_name`, `dish_type`, `price`, `description`, `photo`, `dish_ingredients`) VALUES ('"+ req.body.restraurant_id+"', '" + req.body.dish_name +"', '"+ req.body.dish_type +"', '"+ req.body.price +"', '"+ req.body.description +"', '"+ req.body.photo +"', '"+ req.body.dish_ingredients +"');"
    connection.query(entry, function(err, result){
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else
        {
            res.writeHead(200,{
                'Content-Type' : "text/plain"
            })
            res.end("Successfully added")
        }
        
    });
}

exports.getDishDetails = (req, res) => {
    var query = "SELECT * FROM dish_table WHERE dish_id = '"+ req.body.dish_id +"'";
    connection.query(query, (err, result) =>{
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
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(result[0]));
        }
        
    })
}

exports.updateDish = (req, res) => {
    var query = "UPDATE dish_table SET dish_name = '"+ req.body.dish_name +"', dish_type = '"+ req.body.dish_type +"' , price = '"+ req.body.price +"' , description = '"+ req.body.description +"', photo = '"+ req.body.photo +"', dish_ingredients = '"+ req.body.dish_ingredients +"' WHERE dish_id = '"+ req.body.dish_id +"'";
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
            res.writeHead(200,{
                'Content-Type' : "text/plain"
            })
            res.end("Successfully Updated")
        }
       
    });
}

exports.getDishes = (req, res) => {
    var query = "SELECT * FROM dish_table WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
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
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(result))
        }
        
    })
}
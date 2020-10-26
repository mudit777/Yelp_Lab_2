const e = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database")
var kafka = require("../../../kafka/client");
exports.getRestraurantDetails = (req, res) => {
    console.log("id is ", req.body)
    kafka.make_request("get_restraurant_details", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else{
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result));
        }
    })
};

exports.updateRestraurantDetails = (req, res) => {
    kafka.make_request("update_restraurant_details", req.body, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Updated Info");
        }
    })
    // var query = "UPDATE restraurant_table SET owner_name = '"+ req.body.owner_name +"', email = '"+ req.body.email +"' , phone_number = '"+ req.body.phone_number +"' , restraurant_name = '"+ req.body.restraurant_name +"', description = '"+ req.body.description +"' , location = '"+ req.body.location +"' , zip_code = '"+ req.body.zip_code +"' , weekdays_timings = '"+ req.body.weekdays_timings +"' , weekend_timings = '"+req.body.weekend_timings +"' , cusine = '"+ req.body.cusine +"' , takeout= '"+ req.body.takeout +"' , delivery = '"+ req.body.delivery +"' , dine_in = '"+ req.body.dine_in +"' WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
    // // var query = "UPDATE restraurant_table SET '"+ mysql.escape(req.body) +"' WHERE restraurant_id = '"+ req.body.restraurant_id +"' "  ;
    // connection.query(query, (err, result) => {
    //     if(err)
    //     {
    //         console.log(err)
    //         res.writeHead(500, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     if(result)
    //     {
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Updated Info");
    //     }
        
    // })
};
exports.updateRestrauProfilePic = (req, res) => {
    req.body.path = req.file.path;
    kafka.make_request("update_restraurant_profile_image", req.body, (err, result) => {
        if(err)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else {
            res.end(JSON.stringify(req.file))
        }
    })
    // // var restrauId = req.body.restrauId
    // // var query = "UPDATE restraurant_table SET photo = '" + req.file.path +"' WHERE restraurant_id = '"+ restrauId +"'";
    // // connection.query(query, (err, result) => {
    // //     if(err)
    // //     {
    // //         console.log(err)
    // //         res.writeHead(500, {
    // //             "Content-Type" : "text/plain"
    // //         })
    // //         res.end("Server Side Error")
    // //     }
    // //     if(result)
    // //     {
    // //         res.end(JSON.stringify(req.file))
    // //     }
        
    // });
}
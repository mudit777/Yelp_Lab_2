var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database")
const date = require('date-and-time');

exports.insertRestraurantReview = (req, res) => {
    const now = new Date();
    var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    var query = "INSERT INTO `Yelp`.`review_table` (`user_id`,  `restraurant_id`, `review_description`, `review_ratings`, `review_time`) VALUES ('"+ req.body.user_id+"', '" + req.body.restraurant_id +"', '"+ req.body.review_description +"', '"+ req.body.review_ratings +"', '"+ datetime +"');";
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
           var userQuery = "SELECT * FROM user_table WHERE user_id = '"+ req.body.user_id +"'";
           connection.query(userQuery, (error, userResult) => {
                if(error)
                {
                    console.log(err)
                    res.writeHead(500, {
                        "Content-Type" : "text/plain"
                    })
                    res.end("Server Side Error")
                }
               if(userResult)
               {
                   var review = 0
                   if(userResult[0].total_reviews === 'null' || userResult[0].total_reviews === null)
                   {
                       review = 1;
                   }
                   else
                   {
                        review = parseInt(userResult[0].total_reviews) + 1
                   }
                   var userUpdateQuery = "UPDATE user_table SET total_reviews = '"+ review +"' WHERE user_id = '"+ req.body.user_id +"'";
                   connection.query(userUpdateQuery, (userError, updateUserResult) => {
                        if(userError)
                        {
                            console.log(err)
                            res.writeHead(500, {
                                "Content-Type" : "text/plain"
                            })
                            res.end("Server Side Error")
                        }
                       if(updateUserResult)
                       {
                            var getRestraurant = "SELECT * FROM restraurant_table WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
                            connection.query(getRestraurant, (getResErr, restraurant) => {
                                if(getResErr)
                                {
                                    console.log(getResErr)
                                    res.writeHead(500, {
                                        "Content-Type" : "text/plain"
                                    })
                                    res.end("Server Side Error")
                                }
                                if(restraurant)
                                {
                                    var count = restraurant[0].reviews_count;
                                    var rating = parseFloat(restraurant[0].reviews);
                                    if(rating > 0)
                                    {

                                    }
                                    else {
                                        rating = 0
                                    }
                                    if(rating === 'null' || rating === null)
                                    {
                                        rating = 0
                                    }
                                    if(count === 'null' || count === null)
                                    {
                                        count = 0
                                    }
                                    rating = ((rating * count) + req.body.review_ratings);
                                    count++;
                                    rating = rating / count
                                    var updateRestraurant = "UPDATE restraurant_table SET reviews = '"+ rating +"', reviews_count = '"+ count +"' WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
                                    connection.query(updateRestraurant, (updateResErr, finalRestraurant) => {
                                        if(updateResErr)
                                        {
                                            console.log(err)
                                            res.writeHead(500, {
                                                "Content-Type" : "text/plain"
                                            })
                                            res.end("Server Side Error")
                                        }
                                        if(finalRestraurant)
                                        {
                                            var review = {
                                                reviews_count : count,
                                                reviews_rating : rating
                                            }
                                            res.writeHead(200, {
                                                'Content-Type' : 'application/json'
                                            })
                                            res.end(JSON.stringify(review))
                                        }
                                    })
                                }
                            })
                       }
                   })
               }
           })
        }
        
    })
}

exports.getCustomerReviews = (req, res) => {
    var query = "SELECT * FROM review_table WHERE user_id = '"+ req.body.user_id +"' ";
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
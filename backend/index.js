//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var path = require('path');
const date = require('date-and-time');
const mongoConnection = require('./config')
let connection = require("./database")
app.set('view engine', 'ejs');
var kafka = require('./kafka/client')
var Customers = require('./Models/userModel')
// var mongoose = require('mongoose')
module.exports = app
//use cors to allow cross origin resource sharing
app.use(express.static('public'))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(cors({ origin: 'http://13.57.8.34:3000', credentials: true }));

app.use(bodyParser.json());
const fs = require('fs')
const multer = require("multer");
const DIR = './public/profile_images';
const { response } = require('express');
const e = require('express');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.random() + '-' + fileName)
        //  uuidv4() +
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const dish_DIR = './public/restrau_dish_images'
const dish_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dish_DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.random() + '-' + fileName)
        //  uuidv4() + 
    }
});

var dish_upload = multer({
    storage: dish_storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Origin', 'http://13.57.8.34:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


var customerLoginRouter = require('./src/Customer/Login/Login');
var registerCustomerRouter = require('./src/Customer/RegisterCustomer/RegisterCustomer');
var customerDetailsRouter = require('./src/Customer/CustomerDetails/CustomerDetails');
var restraurantAuthenticationRouter = require('./src/Restraurant/RestraurantAuthentication/RestraurantAuthentication');
var restraurantDetailsRouter = require('./src/Restraurant/RestraurantDetails/RestraurantDetails');
var dishRouter = require('./src/Restraurant/DishDetails/DishDetails');
var othersRouter = require('./src/Customer/Others/Others');
var cartRouter = require('./src/Customer/Cart/Cart');
var customerOrderRouter = require('./src/Customer/Orders/Orders');
var restraurantOrderRouter = require('./src/Restraurant/Orders/Orders');
var customerReviewsRouter = require('./src/Customer/Reviews/Reviews');
var customerEventsRouter = require('./src/Customer/Events/Events');
var restraurantReviewsRouter = require('./src/Restraurant/Reviews/Reviews');
var restraurantEventsRouter = require('./src/Restraurant/Events/Events');
var customerFilterRouter = require('./src/Customer/Filter/Filter')

app.post('/signIn', customerLoginRouter.customerSignIn);
app.post('/registerUser', registerCustomerRouter.RegisterCustomer);
app.post("/getUserDetails", customerDetailsRouter.getCustomerDetails);
app.post("/updateUserInfo", customerDetailsRouter.updateCustomerDetails);
app.post("/registerRestraurant" , restraurantAuthenticationRouter.registerRestraurant);
app.post("/restrauSignIn", restraurantAuthenticationRouter.restraurantSignIn);
app.post("/getRestrauDetails", restraurantDetailsRouter.getRestraurantDetails);
app.post("/updateRestrauDetails", restraurantDetailsRouter.updateRestraurantDetails);
app.post("/addDish", dishRouter.addDish);
app.post("/getDishDetails" , dishRouter.getDishDetails)
app.post("/updateDish", dishRouter.updateDish);
app.post("/getDishes" , dishRouter.getDishes);
app.get("/getAllRestraurants", othersRouter.getAllRestraurants);
app.post("/addItemToCart", cartRouter.addItemToCart);
app.post("/getUserCartDetails", cartRouter.getUserCartDetails);
app.post('/deleteCartItem', cartRouter.deleteCartItem);
app.post("/setCartItemQuantity", cartRouter.setCartItemQuantity);
app.post("/getCartItemDetails", cartRouter.getCartItemDetails);
app.post("/placeOrder", customerOrderRouter.placeOrder);
app.post("/getUserOrders", customerOrderRouter.getCustomerOrders);
app.post("/filterCustomerOrders", customerOrderRouter.filterCustomerOrders);
app.post("/getRestraurantOrders", restraurantOrderRouter.getRestraurantOrders);
app.post("/updateOrderStatus", restraurantOrderRouter.updateOrderStatus);
app.post("/filterRestraurantOrders", restraurantOrderRouter.filterRestraurantOrders);
app.post("/insertRestraurantReview", customerReviewsRouter.insertRestraurantReview);
app.post("/getUserReviews", customerReviewsRouter.getCustomerReviews);
app.post("/getRestraurantReviews", restraurantReviewsRouter.getRestraurantReviews);
app.post("/addEvent", restraurantEventsRouter.addEvent);
app.post("/getRestraurantEvents", restraurantEventsRouter.getRestraurantEvents);
app.post('/getUsersOfAnEvent', restraurantEventsRouter.getUsersOfAnEvent);
app.post("/getEvents", customerEventsRouter.getAllEvents);
app.post("/registerUserForEvent", customerEventsRouter.registerForAnEvent);
app.post("/getUserEvents" , customerEventsRouter.getUserEvents);
app.post("/searchEvents", customerEventsRouter.searchEvents);
app.post("/search", customerFilterRouter.search);
app.post("/finalFilter", customerFilterRouter.finalFilter);
app.post("/uploadPhoto", upload.single('Image'),  customerDetailsRouter.uploadProfileImage);
app.get("/getProfileImage/:userid", (req, res) => {
    Customers.findOne({_id : req.params.userid}, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result !== undefined)
        {
            if(result.profile_photo)
            {
                res.sendFile( __dirname + "/" + result.profile_photo);
            }
            else{
                res.sendFile(__dirname +"/public/profile_images/user.png")
            }
        }

    })
})
app.post("/uploadRestrauProfilePic", upload.single('Image'), function(req, res){
    var restrauId = req.body.restrauId
    var query = "UPDATE restraurant_table SET photo = '" + req.file.path +"' WHERE restraurant_id = '"+ restrauId +"'";
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
            res.end(JSON.stringify(req.file))
        }
        
    });
})
app.get("/getRestrauProfileImage/:restrauId", (req, res) => {
    var query = "SELECT photo FROM restraurant_table WHERE restraurant_id = '"+ req.params.restrauId +"'";
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
            if(result[0].photo === null)   
            {
                res.sendFile(__dirname +"/public/profile_images/user.png")
            }
            else{
                res.sendFile( __dirname + "/" + result[0].photo);
            }
        }
        
        
    })
   
})
app.get("/getDishImage/:dishId", (req, res) => {
    var query = "SELECT photo FROM dish_table WHERE dish_id = '"+ req.params.dishId +"'";
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result[0].photo === null)   
        {
            res.sendFile(__dirname +"/public/profile_images/user.png")
        }
        else{
            res.sendFile( __dirname + "/" + result[0].photo);
        }
        
    })
   
});
app.post("/uploadDishImage", dish_upload.single('Image'), function(req, res){
    res.writeHead(200, {
        'Content-Type' : 'application/json'
    })
    res.end(JSON.stringify(req.file.path))
})
app.post("/uploadRestraurantImages", dish_upload.single('Image'), function(req, res){
    console.log(req)
    var query = "INSERT INTO `Yelp`.`images_table` (`restraurant_id`, `image`) VALUES ('" + req.body.restraurant_id +"', '"+ req.file.path +"');";
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
            res.end(JSON.stringify(req.file.path))
        }
    })
    
})
app.post("/getRestraurantImages", (req, res) =>{
    var query = "SELECT * FROM images_table WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
    connection.query(query, (err, result) => {
        if(err)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        // if(result)
        else
        {
            console.log(result)
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
})








app.listen(8080)
console.log("Server Listening on port 8080");









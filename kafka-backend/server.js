var connection =  new require('./kafka/Connection');
var database = require('./database')
//topics files
//var signin = require('./services/signin.js');
var customer_sign_in = require('./services/Customers/CustomerAuthentication/customer_sign_in');
var customer_register = require('./services/Customers/CustomerAuthentication/register_customer');
var get_customer_details = require('./services/Customers/CustomerDetails/get_customer_details');
var update_customer_details = require('./services/Customers/CustomerDetails/update_customer_details');
var upload_profile_image = require('./services/Customers/CustomerDetails/upload_profile_image');
var register_restraurant = require('./services/Restraurants/RestraurantAuthentication/register_restraurant');
var restraurant_sign_in = require("./services/Restraurants/RestraurantAuthentication/restraurant_sign_in");
var get_restraurant_details = require('./services/Restraurants/RestraurantDetails/get_restraurant_details');
var update_restraurant_details = require('./services/Restraurants/RestraurantDetails/update_restraurant_details');
var update_restraurant_profile_image = require('./services/Restraurants/RestraurantDetails/update_restraurant_profile_image');
var add_dish = require('./services/Restraurants/DishDetails/add_dish');
var get_dishes = require('./services/Restraurants/DishDetails/get_dishes');
var get_dish_details = require('./services/Restraurants/DishDetails/get_dish_details');
var update_dish_details = require('./services/Restraurants/DishDetails/update_dish_details');
var get_all_restraurants = require('./services/Customers/Others/get_all_restraurants');
var add_item_to_cart = require('./services/Customers/CustomerCart/add_item_to_cart');
var get_user_cart_details = require('./services/Customers/CustomerCart/get_customer_cart_details');
var delete_cart_item = require('./services/Customers/CustomerCart/delete_cart_item');
var set_cart_item_quantity = require('./services/Customers/CustomerCart/set_cart_item_quantity');
var get_cart_item_details = require('./services/Customers/CustomerCart/get_cart_item_details');
var place_order = require("./services/Customers/CustomerOrders/place_order");
var get_customer_orders = require('./services/Customers/CustomerOrders/get_customer_orders');
var filter_customer_orders = require('./services/Customers/CustomerOrders/filter_customer_orders');
var get_restraurant_orders = require('./services/Restraurants/RestraurantOrders/get_restraurant_orders');
var update_order_status = require('./services/Restraurants/RestraurantOrders/update_order_status');
var add_event = require('./services/Restraurants/RestraurantEvents/add_event')
var get_restraurant_events = require('./services/Restraurants/RestraurantEvents/get_restraurant_events');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("customer_sign_in", customer_sign_in);
handleTopicRequest("register_customer", customer_register);
handleTopicRequest("get_customer_details", get_customer_details);
handleTopicRequest("update_customer_details", update_customer_details);
handleTopicRequest("upload_profile_image", upload_profile_image);
handleTopicRequest("register_restraurant", register_restraurant);
handleTopicRequest("restraurant_sign_in", restraurant_sign_in);
handleTopicRequest("get_restraurant_details", get_restraurant_details);
handleTopicRequest("update_restraurant_details", update_restraurant_details);
handleTopicRequest("update_restraurant_profile_image", update_restraurant_profile_image);
handleTopicRequest("add_dish", add_dish);
handleTopicRequest("get_dishes", get_dishes);
handleTopicRequest("get_dish_details", get_dish_details);
handleTopicRequest("update_dish_details", update_dish_details);
handleTopicRequest("get_all_restraurants", get_all_restraurants);
handleTopicRequest("add_item_to_cart", add_item_to_cart);
handleTopicRequest("get_user_cart_details", get_user_cart_details);
handleTopicRequest("delete_cart_item", delete_cart_item);
handleTopicRequest("set_cart_item_quantity", set_cart_item_quantity);
handleTopicRequest("get_cart_item_details", get_cart_item_details);
handleTopicRequest("place_order", place_order);
handleTopicRequest("get_customer_orders", get_customer_orders);
handleTopicRequest("filter_customer_orders", filter_customer_orders);
handleTopicRequest("get_restraurant_orders", get_restraurant_orders);
handleTopicRequest("update_order_status", update_order_status);
handleTopicRequest("add_event", add_event);
handleTopicRequest("get_restraurant_events", get_restraurant_events);
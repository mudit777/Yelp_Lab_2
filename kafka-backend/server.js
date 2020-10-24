var connection =  new require('./kafka/Connection');
var database = require('./database')
//topics files
//var signin = require('./services/signin.js');
var customer_sign_in = require('./services/customer_sign_in.js');
var customer_register = require('./services/register_customer');
var get_customer_details = require('./services/get_customer_details');
var update_customer_details = require('./services/update_customer_details');
var upload_profile_image = require('./services/upload_profile_image')

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
handleTopicRequest("upload_profile_image", upload_profile_image)
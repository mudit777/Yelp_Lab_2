import { notification } from 'antd';
import axios from 'axios';
import { BACKEND } from '../../Config';
import { ADD_DISH, ADD_EVENT, FILTER_RESTRAURANT_ORDERS, GET_CURRENT_DISH_DETAILS, GET_CUSTOMER_RESTRAURANT_DISHES, GET_RESTRAURANT_CUSTOMER_DETAILS, GET_RESTRAURANT_DETAILS, GET_RESTRAURANT_DISHES, GET_RESTRAURANT_EVENTS, GET_RESTRAURANT_ORDERS, GET_RESTRAURANT_REVIEWS, GET_USERS_OF_AN_EVENT, INSERT_REVIEW, REGISTER_RESTRAURANT, RESTRAURANT_SIGN_IN, UPDATE_DISH, UPDATE_ORDER_STATUS, UPDATE_RESTRAURANT_IMAGES, UPDATE_RESTRAURANT_PHOTO, UPDATE_RESTRAURANT_PROFILE, UPLOAD_DISH_PICTURE } from '../constants/action-types';

export function restraurant_sign_in(payload)
{
    let data = {};
    return(dispatch) => {
        axios.post(`${BACKEND}/restrauSignIn`, payload).then(response => {
            if(response.status)
            {
                notification["success"]({
                    message: 'User SignedIn',
                    description:
                      'User successfully signed in',
                  });
                window.sessionStorage.setItem("RestrauId",response.data);
                window.sessionStorage.setItem("RestrauLoggedIn", true)
                // window.location.href='/restrauProfile'
                data = {
                    message : "Restraurant Signed In",
                    restraurant_id : response.data
                }
            }
            else if(response.code === 400)
            {

            }
            dispatch({type : RESTRAURANT_SIGN_IN, data})
        }).catch(err => {
            notification["error"]({
                message: 'Invalid credentials',
                description:
                  'Please enter valid Email and Password',
              });
        });
    }
}

export function register_restraurant(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/registerRestraurant`, payload).then(response => {
            if(response.status === 299)
            {
                notification["error"]({
                    message: 'EmailId already in use',
                    description:
                      'A restraurant is registered with this EmailID',
                  });
                  data = {
                    message : "A restraurant is registered with this EmailID"
                }   
            }
            if(response.status === 200)
            {
                notification["success"]({
                    message: 'User Registered',
                    description:
                      'User successfully registered',
                  });
                  setTimeout(function(){
                      window.location.href = '/restrauSignIn'
                  }, 500)
                data = {
                    message : "Restraurant Registered"
                }                
            }
            dispatch({type : REGISTER_RESTRAURANT, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        });
    }
}

export function get_restraurant_profile(payload)
{
    console.log("Hi in actions")
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getRestrauDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurant : response.data,
                    message : "Restraurant profile fetched"
                }
            }
            dispatch({type : GET_RESTRAURANT_DETAILS, data})
        })
    }
}
export function get_restraurant_dishes(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getDishes`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurant_dishes : response.data,
                    message : "Restraurant dishes fetched"
                }
            }
            dispatch({type : GET_RESTRAURANT_DISHES, data})
        })
    }
}
export function get_current_dish_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getDishDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    current_dish_details : response.data,
                    dishUpdatedFlag : false,
                    message : "Current dish details fetched"
                }
            }
            dispatch({type : GET_CURRENT_DISH_DETAILS, data})
        })
    }
}
export function get_restraurant_orders(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getRestraurantOrders`, payload).then(response => {
            if(response.status === 200)
            {
                var result = [];
                var count = 0;
                for(let i in response.data)
                {
                    let order = response.data[i];
                    var user = {
                        UserId : order.user_id
                    }
                    let temp = async () => {
                        const userResponse = await axios.post(`${BACKEND}/getUserDetails`, user)
                        return userResponse;
                    }
                    temp().then(userResponse => {
                        if(userResponse.status === 200)
                        {
                            order = {...order, user : userResponse.data}
                            result.push(order)
                            count++;
                            if(count === response.data.length)
                            {
                                data = {
                                    restraurant_orders : result,
                                    message : "Restraurant orders fetched"
                                }
                                console.log("restraurant orders are", data)
                                dispatch({type : GET_RESTRAURANT_ORDERS, data})
                            }
                        }
                    })
                }
               
            }
            
        })
    }
}
export function filter_restraurant_orders(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/filterRestraurantOrders`, payload).then(response => {
            if(response.status === 200)
            {
                var result = []
                var count = 0
                for(let i in response.data)
                {
                    let order = response.data[i]
                    var user = {
                        UserId : order.user_id
                    }
                    let temp = async () => {
                        const userResponse = await axios.post(`${BACKEND}/getUserDetails`, user)
                        return userResponse;
                    }
                    temp().then(userResponse => {
                        if(userResponse.status === 200)
                        {
                            order = {...order, user : userResponse.data}
                            result.push(order)
                            count++;
                            if(count === response.data.length)
                            {
                                data = {
                                    restraurant_orders : result,
                                    message : "Restraurant orders fetched"
                                }
                                console.log("restraurant orders are", data)
                                dispatch({type : FILTER_RESTRAURANT_ORDERS, data})
                            }
                        }
                    })
                }
                
            }
        })
    }
}
export function get_restraurant_reviews(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getRestraurantReviews`, payload).then(response => {
            if(response.status === 200)
            {
                var result = []
                for(let i in response.data)
                {
                    let review = response.data[i];
                    var customer = {
                        UserId : review.user_id
                    }
                    let temp = async() => {
                        const customerResponse = await axios.post(`${BACKEND}/getUserDetails`, customer);
                        return customerResponse
                    }
                    temp().then(customerResponse => {
                        if(customerResponse.status === 200)
                        {
                            review = {...review, user : customerResponse.data}
                            result.push(review)
                            if(result.length === response.data.length)
                            {
                                data = {
                                    restraurant_reviews : result,
                                    message : "Restraurants reviews have been fetched"
                                }
                                dispatch({type : GET_RESTRAURANT_REVIEWS, data})
                            }
                        }
                    })
                }
                
            }
        })
    }
}
export function get_restraurant_events(payload)
{
    console.log("GEtting evnts", payload)
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getRestraurantEvents`, payload).then(response => {
           
            if(response.status === 200)
            {
                
                data = {
                    restraurant_events : response.data,
                    message : "Restraurants events have been fetched"
                }
                console.log("Respone is ------------------",data)
            }
            dispatch({type : GET_RESTRAURANT_EVENTS, data})
        })
    }
}
export function add_dish(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.withCredentials = true;
        axios.post(`${BACKEND}/addDish`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    dishUpdatedFlag : true,
                    message : "Dish has been added"
                }
            }
            dispatch({type : ADD_DISH, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        });
    }
}
export function update_dish(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.withCredentials = true;
        axios.post(`${BACKEND}/updateDish`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    dishUpdatedFlag : true,
                    message : "Dish has been updated"
                }
            }
            dispatch({type : UPDATE_DISH, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        });
    }
}
export function upload_dish_image(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.withCredentials = true;
        axios.post(`${BACKEND}/uploadDishImage`, payload).then(response => {
            var fileName = response.data.split('public').pop();
            data = {
                photoSrc : response.data,
                fileName : fileName
            }
            dispatch({type : UPLOAD_DISH_PICTURE, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function get_users_of_an_event(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getUsersOfAnEvent`, payload).then(reponse => {
            if(reponse.status === 200)
            {
                data = {
                    message : "Users of an event fetched",
                    users_of_an_event : reponse.data
                }
            }
            dispatch({type : GET_USERS_OF_AN_EVENT, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function update_order_status(payload)
{
    let data = {} 
    return(dispatch) => {
        axios.post(`${BACKEND}/updateOrderStatus`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Order status has been updated"
                }
            }
            dispatch({
                type : UPDATE_ORDER_STATUS,
                data
            })
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        })
    }
}
export function update_restraurant_profile_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/updateRestrauDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Restraurant details updated"
                }
            }
            dispatch({type : UPDATE_RESTRAURANT_PROFILE, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        });
    }
}
export function update_restraurant_photo(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/uploadRestrauProfilePic`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Photo Uploaded"
                }
            }
            dispatch({type : UPDATE_RESTRAURANT_PHOTO, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        });
    }
}
export function update_restraurant_images(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/uploadRestraurantImages`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Uploded restraurant images",
                    restraurant_image_name : response.data
                }
            }
            dispatch({type : UPDATE_RESTRAURANT_IMAGES, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        })
    }
}
export function get_restraurant_customer_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/getUserDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Customer details fetched",
                    restraurant_customer : response.data
                }
            }
            dispatch({type : GET_RESTRAURANT_CUSTOMER_DETAILS, data})
        })
    }
}
export function add_event(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/addEvent`, payload).then(response => {
            if(response.status === 200)
            {
                setTimeout(() => {
                    notification["success"]({
                        message: 'Event added',
                        description:
                          'Event Successfully Added',
                      });
                })
                data = {
                    message : "Event Successfully Added"
                }
            }
            dispatch({type : ADD_EVENT, data})
        }).catch();
    }
}
export function insert_review(payload)
{

    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/insertRestraurantReview`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Review Inserted",
                    restraurant_review_stars : response.data.reviews_rating,
                    reviews_count : response.data.reviews_count
                }
                dispatch({type : INSERT_REVIEW, data})
            }
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        })
    }
}
import { notification } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import { get_cart_item_details, get_customer_current_dish_details } from '../../js/actions/index';
import { connect } from "react-redux";
class CartItemDisplay extends Component {
    constructor(props){
        super(props);
        console.log("Cart item details props are", props)
        this.state = {
            dish :"",
            dishQuantity : 0
        }
        if(props.item)
        {
            var cart = {
                cart_id : props.item
            }
            console.log("Hiiiiiix with cart item ", cart);
            // this.props.get_cart_item_details(cart)
            Axios.post(`${BACKEND}/getCartItemDetails`, cart).then(response => {
                if(response.status === 200)
                {
                    // console.log("cart response is ", response)
                    var dish = {
                        dish_id : response.data.dish_id
                    }
                    Axios.post(`${BACKEND}/getDishDetails`, dish).then(dishResponse => {
                        if(dishResponse.status === 200)
                        {
                            // console.log("Response of dish ", dish);
                            this.setState({
                                dish : dishResponse.data.dish_name,
                                dishQuantity : response.data.quantity
                            })
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
            }).catch(err => {
                console.log(err);
            })
        }
        
    }
    // UNSAFE_componentWillReceiveProps()
    // {
    //     setTimeout(() => {
    //         if(this.props.current_cart_item_details)
    //         {
    //             var dish = {
    //                 dish_id : this.props.current_cart_item_details.dish_id
    //             }
    //             this.props.get_customer_current_dish_details(dish)
    //         }
    //         if(this.props.customer_current_dish_details)
    //         {
    //             this.setState({
    //                 dish : this.props.current_cart_item_details.dish_name,
    //                 dishQuantity : this.props.current_cart_item_details.quantity
    //             })
    //         }
            
    //     })
    // }
    render() {
        return (
            <div>
                <h3>{this.state.dish} : {this.state.dishQuantity}</h3>
            </div>
        )
    }
}
// export default CartItemDisplay;
function mapDispatchToProps(dispatch) {
    return {
      get_cart_item_details : user => dispatch(get_cart_item_details(user)),
      get_customer_current_dish_details : user => dispatch(get_customer_current_dish_details(user))
    };
  }
  
function mapStateToProps(store) {
return {
   message : store.message,
   current_cart_item_details : store.current_cart_item_details,
   customer_current_dish_details : store.customer_current_dish_details
};
}

const cartItemDisplyForm = connect(mapStateToProps, mapDispatchToProps)(CartItemDisplay);
export default cartItemDisplyForm;
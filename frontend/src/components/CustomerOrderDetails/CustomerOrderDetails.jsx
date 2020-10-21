import { Button, Card, Col, notification, Progress, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import CartItemDisplay from '../CartItemDisplay/CartItemDisplay';
import './CustomerOrderDetails.css'
import { get_customer_restraurant_details } from '../../js/actions';
import { connect } from "react-redux";
class CustomerOrderDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            order_id: props.order.order_id,
            restraurant_id : props.order.restraurant_id,
            items : props.order.items,
            status : props.order.status,
            order_type: props.order.order_type,
            amount : props.order.amount,
            time_placed : props.order.time_placed,
            restraurant_name : "",
            cartDishes : [],
            profileImage : "",
            percentage : 0,
            restraurant : props.order.restraurant
        }
        
    }
    componentDidMount(){
        var per = 0
        switch(this.state.status){
            case 'order recieved' :
                per = 25
                break;
            case 'preparing' :
                per = 50
                break;
            case 'on the way' :
                per = 75
                break;
            case 'ready for pick up' :
                per = 75
                break;    
            case 'delivered' :
                per = 100
                break;
            case 'picked up' :
                per = 100
                break
        }
        var cartItems = this.state.items.split(',');
        this.setState({
            order_id : this.props.order.order_id,
            user_id : this.props.order.user_id,
            restraurant_id : this.props.order.restraurant_id,
            items : this.props.order.items,
            status : this.props.order.status,
            time_placed : this.props.order.time_placed, 
            percentage : per,
            restraurant_name : this.props.order.restraurant.restraurant_name,
            cartDishes : cartItems,
            profileImage : `${BACKEND}/getRestrauProfileImage/` + this.props.order.restraurant.restraurant_id,
        })
        
    }
    
    
    render() {
        var temp = null
        
        return (
            <div>
                <div className = "orderDetails" id ="orderDetailsDiv">
                    <Card title = {this.state.restraurant_name} style={{width : "200%",color:"#d32323", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} extra={this.state.time_placed} actions={[
                        // <Button style={{float:"right"}}>Write Review for Restraurant</Button>
                    ]}>
                        <Row>
                            <Col md={3}>
                                <Avatar size={150} src = {this.state.profileImage} />
                            </Col>
                            <Col  md={6} style={{marginLeft:"5%"}}>
                                <ul style={{listStyleType:'none'}}>
                                    <li>
                                        <h3>Items</h3>
                                        <ul style = {{listStyleType:"none"}}>
                                            {this.state.cartDishes.map(i =>{ 
                                                return(
                                                    <li style={{width:"175%"}} key = {Math.random()}>
                                                        <CartItemDisplay item = {i}/>
                                                    </li>
                                                    
                                                )
                                            })}
                                        </ul>
                                    </li>
                                    <li style={{marginTop:"30%"}}>
                                        <Row>
                                            <Col>
                                                <h3>Amount: $</h3>
                                            </Col>
                                            <Col>
                                                <h3>{this.state.amount}</h3>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul> 

                            </Col>
                            <Col md={3} style={{marginLeft:"33%"}}>
                                <Progress
                                 type="dashboard" 
                                 strokeColor={{
                                    "0%": "#d32323",
                                    "100%": "#d32323"
                                  }}
                                 percent = {this.state.percentage}
                                 format={(percent) => `${this.state.status}`} 
                                 />  
                                 
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        )
    }
}
// export default CustomerOrderDetails;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_restraurant_details: user => dispatch(get_customer_restraurant_details(user))
    };
  }
  
function mapStateToProps(store) {
return {
    message : store.message,
    customer_restraurant : store.customer_restraurant
};
}

const customerOrderDetailsForm = connect(mapStateToProps, mapDispatchToProps)(CustomerOrderDetails);
export default customerOrderDetailsForm;
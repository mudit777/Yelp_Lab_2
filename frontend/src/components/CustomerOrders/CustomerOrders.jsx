import { faCalendarWeek, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Col, notification, Row } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import CustomerOrderDetails from '../CustomerOrderDetails/CustomerOrderDetails';
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import { getCustomerOrders, filter_customer_orders } from '../../js/actions';
import { connect } from "react-redux";
import CustomerNavigation from '../CustomerNavigation/CustomerNavigation';
class CustomerOrders extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            orders : [],
            current : false,
            past : false,
            currentDelivery : false,
            currentTakeout : false,
            pastDelivery : false,
            pastTakeout : false,  
            cancel : false
        }
    }
    componentDidMount() {
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            var user = {
                user_id : sessionStorage.getItem("UserId")
            }
            this.props.getCustomerOrders(user);
        }
       
    }
    componentWillReceiveProps()
    {
        setTimeout(() => {
            this.setState({
                orders : this.props.customer_orders
            })
        })
    }
    filterOrders = (data) => {
        var myJson = {
            filter : data,
            user_id : sessionStorage.getItem("UserId")
        }
        this.props.filter_customer_orders(myJson);
    }
    render() {
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.props.customer_orders)
        {
            temp = this.props.customer_orders.map(i => {
                return(
                    <CustomerOrderDetails order = {i} key = {i.order_id} />
                )
            })
        }
        if(this.state.orders.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No such Orders found</h1>
            </div>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperCustomerProfile />
                </div>
                <div>
                    <MiddleCustomerProfile />
                </div>
                <div>
                    <Row style ={{marginTop:"3%"}}>
                        <Col style = {{marginLeft:"15%", width :"10%"}}>
                            <CustomerNavigation />
                        </Col>
                        <Col md = {4}>
                            <ul style ={{listStyleType:'none'}}> 
                                <li>
                                    <Checkbox onClick = {() => this.filterOrders('order recieved')}>Order Recieved</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onClick = {() => this.filterOrders('preparing')}>Preparing</Checkbox>
                                </li>
                                <li>
                                    <h2 style= {{color : "#d32323"}}>Take Out: </h2>
                                    <ul style ={{listStyleType:'none', marginLeft : "-20%"}}> 
                                        <li>
                                            <Checkbox onClick = {() => this.filterOrders('ready for pick up')}>Ready for Pickup</Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox onClick = {() => this.filterOrders('picked up')}>Picked Up</Checkbox>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <h2 style= {{color : "#d32323"}}>Delivery: </h2>
                                    <ul style ={{listStyleType:'none', marginLeft : "-20%"}}> 
                                        <li>
                                            <Checkbox onClick = {() => this.filterOrders('on the way')}>On The Way</Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox onClick = {() => this.filterOrders('delivered')}>Delivered</Checkbox>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            
                        </Col>
                        <Col md = {6}>
                            {temp}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
// export default CustomerOrders;
function mapDispatchToProps(dispatch) {
    return {
        getCustomerOrders: user => dispatch(getCustomerOrders(user)),
        filter_customer_orders : user => dispatch(filter_customer_orders(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
     customer_orders : store.customer_orders
    };
  }
 
  const customerOrders = connect(mapStateToProps, mapDispatchToProps)(CustomerOrders);
  export default customerOrders;
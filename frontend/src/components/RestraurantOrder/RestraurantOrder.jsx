import React, { Component } from 'react'
import './ResrtraurantOrder.css'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import MiddleRestraurantProfile from '../MiddleRestraurantProfile/MiddleRestraurantProfile'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import RestraurantOrderDetails from '../RestraurantOrderDetails/RestraurantOrderDetails';
import { Checkbox, Col, notification, Row } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarDay, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';
import { filter_restraurant_orders, get_restraurant_orders } from '../../js/actions/restraurant';
import { connect } from "react-redux";
class RestraurantOrder extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            orders: [],
            current : false,
            past : false,
            currentDelivery : false,
            currentTakeout : false,
            pastDelivery : false,
            pastTakeout : false
        }
        if(window.sessionStorage.getItem('RestrauLoggedIn') === 'true')
        {
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_orders(restraurant);
        }
       
    }
    componentDidMount() {
        document.getElementById("pastOrdersFilters").style.display = 'none'
        document.getElementById("currentOrdersFilters").style.display = 'none'
    }
    
    
    handleCurrentOrders = (e) => {
       
        console.log(e.target.checked)
        if(e.target.checked)
        {
            console.log("SEtting current")
            this.setState({
                current : true
            })
            document.getElementById("currentOrdersFilters").style.display = 'block'
            document.getElementById("pastOrdersFilters").style.display = 'none'
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "current"
            }
            this.props.filter_restraurant_orders(order);
        }
        else{
            document.getElementById("currentOrdersFilters").style.display = 'none'
            this.setState({
                current : false
            })
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_orders(restraurant);
        }
    }
    handlePastOrders = (e) => {
        
        if(e.target.checked)
        {
            document.getElementById("pastOrdersFilters").style.display = 'block'
            document.getElementById("currentOrdersFilters").style.display = 'none'
            this.setState({
                past : true,
                current : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "past"
            }
           this.props.filter_restraurant_orders(order)
        }
        else{
            document.getElementById("pastOrdersFilters").style.display = 'none'
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_orders(restraurant)
        }

        
    }
    handleCurrentDelivery = (e) =>{
        if(e.target.checked)
        {
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "currentDelivery"
            }
            this.setState({
                currentDelivery : true,
                currentTakeout : false
            })
            this.props.filter_restraurant_orders(order)
        }
        else
        {
            this.setState({
                currentDelivery : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "current"
            }
            this.props.filter_restraurant_orders(order)
        }
        
        
    }
    handleCurrentTakeout = (e) =>{
        if(e.target.checked)
        {
            this.setState({
                currentDelivery : false,
                currentTakeout : true
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "currentTakeout"
            }
            this.props.filter_restraurant_orders(order)
        }
        else{
            this.setState({
                currentTakeout : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "current"
            }
            this.props.filter_restraurant_orders(order)
        }
        
    }
    handlePastDelivery = (e) =>{
        if(e.target.checked)
        {
            this.setState({
                pastDelivery : true,
                
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "pastDelivery"
            }
            this.props.filter_restraurant_orders(order)
        }
        else{
            this.setState({
                pastDelivery : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "past"
            }
            this.props.filter_restraurant_orders(order)
        }
        
    }
    handlePastTakeout = (e) =>{
        if(e.target.checked)
        {
            this.setState({
                pastTakeout : true,
                pastDelivery : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "pastTakeout"
            }
            this.props.filter_restraurant_orders(order)
        }
        else{
            this.setState({
                pastTakeout : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "past"
            }
            this.props.filter_restraurant_orders(order)
        }
        
    }
    handleCanceledOrders = (e) => {
        if(e.target.checked)
        {
            this.setState({
                canceled : true
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "canceled"
            }
            this.props.filter_restraurant_orders(order)
        }
    }
    render() {
        var temp = null;
        if(this.props.restraurant_orders)
        {
            console.log("Restraurant orders are", this.props.restraurant_orders)
            temp = this.props.restraurant_orders.map(i => {
                return(
                    <RestraurantOrderDetails order = {i} />
                )
            })
        }
        else{
            temp = <div>
            <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No Orders found</h1>
        </div>
        }
        let redirectVar = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/restrauSignIn'></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperRestraurantProfile />
                </div>
                <div>
                    <MiddleRestraurantProfile />
                </div>
                <div>
                    <Row style = {{marginTop: "3%"}}>
                        <Col md={4} style = {{marginLeft : "15%", width:"10%"}}>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname : "/restrauProfile"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faUser} />
                                                </Col>
                                                <Col>
                                                    <h3>Profile</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname : "/restraurantOrders"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faJedi} />
                                                </Col>
                                                <Col>
                                                    <h3>Orders</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname : "/restraurantReviews"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faStar} />
                                                </Col>
                                                <Col>
                                                    <h3>Reviews</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname :"/restraurantEvents"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faCalendarCheck} />
                                                </Col>
                                                <Col>
                                                    <h3>Events</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                            <ul style = {{listStyleType : 'none'}}>
                                <li>
                                    <Checkbox value = {this.state.current} onChange = {this.handleCurrentOrders}>Current Orders</Checkbox>
                                    <ul style = {{listStyleType : "none"}} id = "currentOrdersFilters">
                                        <li>
                                            <Checkbox value = {this.state.currentDelivery} onChange = {this.handleCurrentDelivery}>Delivery</Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox value = {this.state.currentTakeout} onChange = {this.handleCurrentTakeout}>Takeout</Checkbox>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Checkbox value = {this.state.past} onChange = {this.handlePastOrders}>Past Orders</Checkbox>
                                    <ul style = {{listStyleType : "none"}} id = "pastOrdersFilters">
                                        <li >
                                            <Checkbox value = {this.state.pastDelivery} onChange = {this.handlePastDelivery}>Delivery</Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox value = {this.state.pastTakeout} onChange = {this.handlePastTakeout}>Takeout</Checkbox>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Checkbox value = {this.state.canceled} onChange = {this.handleCanceledOrders}>Canceled Orders</Checkbox>
                                </li>
                            </ul>                            
                        </Col>
                        <Col md = {8}>
                            {temp}
                            
                        </Col>
                    </Row>
                    
                </div>
            </div>
        )
    }
}
// export default RestraurantOrder;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_orders: user => dispatch(get_restraurant_orders(user)),
        filter_restraurant_orders: user => dispatch(filter_restraurant_orders(user))
    };
}
    
function mapStateToProps(store) {
    return {
        restraurant_orders : store.restraurant_orders
    };
}
    
const restraurant_orders = connect(mapStateToProps, mapDispatchToProps)(RestraurantOrder);
export default restraurant_orders;
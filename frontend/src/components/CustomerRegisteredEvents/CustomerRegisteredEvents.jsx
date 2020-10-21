import { faCalendarWeek, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, notification, Row } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile';
import RegisteredEventCard from '../RegisteredEventCard/RegisteredEventCard';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import { get_customer_registered_events } from '../../js/actions';
import { connect } from "react-redux";
import CustomerNavigation from '../CustomerNavigation/CustomerNavigation';
class CustomerRegisteredEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            events : []
        }
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            var user = {
                user_id : window.sessionStorage.getItem("UserId")
            }
            this.props.get_customer_registered_events(user)
        }
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                events : this.props.customer_registered_events
            })
        })
    }
    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.state.events.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No such events found</h1>
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
                    <Row style = {{marginTop:"2%"}}>
                        <Col md = {4} style = {{marginLeft :"15%"}}>
                            <CustomerNavigation />
                        </Col>
                        <Col md = {8}>
                            {temp}
                            {this.state.events.map(i => {
                                return(
                                    <RegisteredEventCard event = {i} key = {i.event_id} />
                                )
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
// export default  CustomerRegisteredEvents;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_registered_events: user => dispatch(get_customer_registered_events(user))
    };
  }
  
  function mapStateToProps(store) {
    console.log("STORE in registered events is: ", store)
    return {
        customer_registered_events : store.customer_registered_events
    };
  }
 
  const customer_registered_events_form = connect(mapStateToProps, mapDispatchToProps)(CustomerRegisteredEvents);
  export default customer_registered_events_form;
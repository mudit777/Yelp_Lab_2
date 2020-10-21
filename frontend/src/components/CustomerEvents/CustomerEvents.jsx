import { Button, Card, Col, Input, notification, Row } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import CustomerEventRegistrationCard from '../CustomerEventRegistrationCard/CustomerEventRegistrationCard';
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import { get_customer_events, search_customer_events } from '../../js/actions';
import { connect } from "react-redux";
class CustomerEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            events : []
        }
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            this.props.get_customer_events()
        }        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                events : this.props.customer_events
            })
        })
    }
    searchEvent = () => {
        var myJson = {
            search : document.getElementById("eventSearch").value
        }
        this.props.search_customer_events(myJson);
        
    }
    render() {
        console.log(window.sessionStorage)
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.state.events.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No events found</h1>
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
                    <Row>
                        <Col md = {4} style = {{marginLeft :"13%", marginTop:"5%"}}>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Input id = 'eventSearch' placeholder = "Search Event"></Input>
                                </li>
                                <li style = {{marginTop : "5%"}}>
                                    <Button onClick = {this.searchEvent} style = {{width:"100%"}}>Search</Button>
                                </li>
                            </ul>
                        </Col>
                        <Col md = {8} style = {{marginLeft: "4%"}}>
                        {temp}
                            {this.state.events.map(i => {
                                return(
                                    <CustomerEventRegistrationCard event = {i} key = {i.event_id} />
                                )
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
// export default  CustomerEvents;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_events: user => dispatch(get_customer_events(user)),
        search_customer_events: user => dispatch(search_customer_events(user))        
    };
  }
  
  function mapStateToProps(store) {
    console.log('CUSTOMER events stoere is' , store)
    return {
      customer_events : store.customer_events
    };
  }
 
  const customerEvents = connect(mapStateToProps, mapDispatchToProps)(CustomerEvents);
  export default customerEvents;
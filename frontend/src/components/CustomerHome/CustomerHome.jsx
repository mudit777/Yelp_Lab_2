import { Col, Row } from 'antd'
import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import { getRestraurant, getDeliveryFilterRestraurants, getNeighorhoodFilterRestraurants, finalFilter} from '../../js/actions';
import Filter from '../Filter/Filter'
import Restraurant from '../Restraurant/Restraurant';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import GoogleMap from '../GoogleMap/GoogleMap'
import { connect } from "react-redux";
class CustomerHome extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            restraurants : []
        }
    }
    componentDidMount() {
        // console.log(this.props.history.location)
        // if(window.sessionStorage.getItem)
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            this.props.getRestraurant();
        }
    }
    componentWillReceiveProps () {
        setTimeout(() => {
            this.setState({
                restraurants : this.props.restraurants
            })
        }, 0)
    }
    finalFilter = (filter, neighorhoods) => {
        filter['search'] = document.getElementById("search").value;
        filter['neighorhoods'] = neighorhoods
        filter['location'] = document.getElementById("searchLocation").value
        this.props.finalFilter(filter)
    }
    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.state.restraurants.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No such restraurants found</h1>
            </div>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperCustomerProfile />
                </div>
                <div>
                    <Row style={{marginTop:"2%"}}>
                        <Col md = {3} style={{marginLeft:"3%"}}>
                            <Filter callBackForFinalFilter = {this.finalFilter} />
                        </Col>
                        <Col md = {6} style={{marginLeft:"7%", }}>
                            {temp}
                            {this.state.restraurants.map(i => {
                                return <Restraurant key = {i.restraurant_id} restraurant = {i} />
                            })}
                        </Col>
                        <Col md = {3} style = {{marginLeft : "27%"}}>
                            {/* <GoogleMap  restraurants = {this.state.restraurants}/> */}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
// export default CustomerHome
function mapDispatchToProps(dispatch) {
    return {
      getRestraurant: user => dispatch(getRestraurant()),
      getDeliveryFilterRestraurants: user => dispatch(getDeliveryFilterRestraurants(user)),
      getNeighorhoodFilterRestraurants : user => dispatch(getNeighorhoodFilterRestraurants(user)),
      finalFilter : user => dispatch(finalFilter(user))
    };
  }
  
  function mapStateToProps(store) {
      console.log("The store is", store)
    return {
      
    //   user_id : store.user_id
       restraurants : store.restraurants
    };
  }
 
  const customeHome = connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
  export default customeHome;
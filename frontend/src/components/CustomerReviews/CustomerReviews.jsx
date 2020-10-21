import { Col, notification, Row } from 'antd'
import React, { Component } from 'react'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import RestraurantReviewCard from '../RestraurantReviewCard/RestraurantReviewCard';
import CustomerReviewCard from '../CustomerReviewCard/CustomerReviewCard';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { get_customer_reviews } from '../../js/actions';
import { connect } from "react-redux";
import CustomerNavigation from '../CustomerNavigation/CustomerNavigation';
class CustomerReviews extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviews : [],
        }

        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            var user = {
                user_id : window.sessionStorage.getItem("UserId")
            }
            this.props.get_customer_reviews(user)
        }
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                reviews : this.props.customer_reviews
            })
        })
    }
    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/login'></Redirect>
        }
        var temp = null;
        // if(this.props.customer_reviews.length === 0)
        // {
        //     temp = <div>
        //         <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No Reviews found</h1>
        //     </div>
        // }
        if(this.props.customer_reviews)
        {
            temp = this.props.customer_reviews.map(i => {
                return(
                    <CustomerReviewCard review = {i} key = {i.review_id}/>
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperCustomerProfile />
                </div>
                <div>
                    <MiddleCustomerProfile   />
                </div>
                <div>
                   <Row style = {{marginTop :"2%"}}>
                    <Col md = {4} style={{marginLeft:"15%"}} >
                        <CustomerNavigation />
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
// export default CustomerReviews
function mapDispatchToProps(dispatch) {
    return {
        get_customer_reviews: user => dispatch(get_customer_reviews(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
        customer_reviews : store.customer_reviews,
        user : store.user
    };
  }
 
  const customer_reviews = connect(mapStateToProps, mapDispatchToProps)(CustomerReviews);
  export default customer_reviews;
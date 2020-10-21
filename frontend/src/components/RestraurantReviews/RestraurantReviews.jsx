import React, { Component } from 'react'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import MiddleRestraurantProfile from '../MiddleRestraurantProfile/MiddleRestraurantProfile'
import { Col, notification, Row } from 'antd'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import RestraurantReviewCard from '../RestraurantReviewCard/RestraurantReviewCard';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarDay, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';
import { get_restraurant_reviews } from '../../js/actions/restraurant';
import { connect } from "react-redux";
class RestraurantReviews extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviews : []
        }
        if(window.sessionStorage.getItem('RestrauLoggedIn') === 'true')
        {
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_reviews(restraurant);
        }
        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
           this.setState({
               reviews : this.props.restraurant_reviews
           }) 
        }, );
    }
    // getRestraurantReviews = () => {
    //     var restraurant = {
    //         restraurant_id : window.sessionStorage.getItem("RestrauId")
    //     }
    //     Axios.post(`${BACKEND}/getRestraurantReviews`, restraurant).then(response => {
    //         if(response.status === 200)
    //         {
    //             this.setState({
    //                 reviews : response.data
    //             })
    //         }
    //     }).catch(err => {
    //         if(err)
    //         {
    //             notification["error"]({
    //                 message: 'Server Sider error',
    //                 description:
    //                 'Please try again in few minutes',
    //             });
    //         }
    //     })
    // }
    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.props.restraurant_reviews)
        {
            temp = this.props.restraurant_reviews.map(i => {
                return(
                    <RestraurantReviewCard review = {i} key = {i.review_id}  />
                )
            })
        }
        if(this.state.reviews.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No Reviews found</h1>
            </div>
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
                    <Row style = {{marginTop:"1%"}}>
                        <Col md = {4} style = {{marginLeft : "15%"}}>
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
// export default RestraurantReviews;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_reviews: user => dispatch(get_restraurant_reviews(user))
    };
    }
    
    function mapStateToProps(store) {
    console.log("STore is restrau profile is ", store)
    return {
        restraurant_reviews : store.restraurant_reviews
    };
    }
    
    const restraurant_reviews_form = connect(mapStateToProps, mapDispatchToProps)(RestraurantReviews);
    export default restraurant_reviews_form;
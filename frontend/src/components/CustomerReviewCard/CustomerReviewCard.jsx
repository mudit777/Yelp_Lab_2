import { Card, Col, notification, Rate, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import { get_customer_restraurant_details, register_for_an_event } from '../../js/actions';
import { connect } from "react-redux";
class CustomerReviewCard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            review_id : props.review.review_id,
            user_id : props.review.user_id,
            restraurant_id : props.review.restraurant_id,
            review_ratings : props.review.review_ratings,
            review_description : props.review.review_description,
            review_time : props.review.review_time,
            user_name : props.review.restraurant.restraurant_name,
            image : `${BACKEND}/getRestrauProfileImage/` +  props.review.restraurant_id,
        }
    }

    render() {
        
        return (
            
            <div style = {{marginTop : "3%"}}>
                <Card title = {this.state.user_name} style = {{width:"150%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} extra = {this.state.review_date}>
                    <Row>
                        <Col md = {5} >
                            <Avatar size={100} src = {this.state.image} />
                        </Col>
                        <Col md = {7} style = {{borderLeft:"1px solid lightgrey"}}>
                            <ul style ={{listStyleType:"none"}}>
                                <li>
                                    <Rate  defaultValue = {this.state.review_ratings} disabled/>
                                </li>
                                <li style = {{width : "300%"}}>
                                    <h3 style = {{color :"grey"}}>{this.state.review_description}</h3>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
// export default CustomerReviewCard;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_restraurant_details : user => dispatch(get_customer_restraurant_details(user))
    };
  }
  
function mapStateToProps(store) {
return {
   message : store.message,
   customer_restraurant : store.customer_restraurant
};
}

const customerReviewCard = connect(mapStateToProps, mapDispatchToProps)(CustomerReviewCard);
export default customerReviewCard;
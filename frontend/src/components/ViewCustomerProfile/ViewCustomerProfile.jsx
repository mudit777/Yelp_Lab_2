import { faCamera, faStar, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BACKEND } from '../../Config';
import { getCustomerProfile } from '../../js/actions';
import { get_restraurant_customer_details } from '../../js/actions/restraurant';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';
class ViewCustomerProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: {},
            image : "",
            fullName : "",
            location : ""
        }
        console.log(this.props.history.location.state.id)
        var user = {
            UserId : this.props.history.location.state.id
        }
        this.props.get_restraurant_customer_details(user)
        this.getUserDetails()
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                user : this.props.restraurant_customer,
                image : `${BACKEND}/getProfileImage/` +  this.props.history.location.state.id,
                fullName : this.props.restraurant_customer.first_name + " " + this.props.restraurant_customer.last_name,
                location : this.props.restraurant_customer.city + ", " + this.props.restraurant_customer.state
            })
        }, );
    }
    getUserDetails = () => {
        var user = {
            UserId : this.props.history.location.state.id
        }
        // Axios.post(`${BACKEND}/getUserDetails`, user).then(response => {
        //     if(response.status === 200)
        //     {
        //         this.setState({
        //             user : response.data,
        //             image : `${BACKEND}/getProfileImage/` +  this.props.history.location.state.id,
        //             fullName : response.data.first_name + " " + response.data.last_name,
        //             location : response.data.city + ", " + response.data.state
        //         })
        //     }
        // }).catch()
    }
    render() {
        console.log(this.state)
        var temp = null
        if(this.props.restraurant_customer)
        {
            temp = <ul style = {{listStyleType : "none"}}>
            <li>
                <Row>
                    <Col md  = {6}>
                        <Card title = "General Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "150%"}}>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Nick name: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.nick_name}</h3>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>BirthDay: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.birth_day}</h3>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Email: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.email}</h3>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Phone Number: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.phone_number}</h3>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col md  = {6} style = {{marginLeft:"20%"}}>
                        <Card title = "Address Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "150%"}}>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Address: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.address}</h3>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>City: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.city}</h3>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>State: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.state}</h3>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row>
                                        <Col>
                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>zip_code: </h3>
                                        </Col>
                                        <Col style = {{marginLeft : "1%"}}>
                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.zip_code}</h3>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </li>
            <li style = {{width: "83%", marginTop : "1%"}}>
                <Card title = "Other Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <ul style = {{listStyleType : "none"}}>
                        <li>
                            <Row>
                                <Col>
                                    <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Headline: </h3>
                                </Col>
                                <Col style = {{marginLeft : "1%"}}>
                                    <h3 style = {{fontWeight : "bolder"}}>{this.state.user.headline}</h3>
                                </Col>
                            </Row>
                        </li>
                        <li>
                            <Row>
                                <Col>
                                    <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Things I Love: </h3>
                                </Col>
                                <Col style = {{marginLeft : "1%"}}>
                                    <h3 style = {{fontWeight : "bolder"}}>{this.state.user.things_i_love}</h3>
                                </Col>
                            </Row>
                        </li>
                        <li>
                            <Row>
                                <Col>
                                    <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Favourites: </h3>
                                </Col>
                                <Col style = {{marginLeft : "1%"}}>
                                    <h3 style = {{fontWeight : "bolder"}}>{this.state.user.favourites}</h3>
                                </Col>
                            </Row>
                        </li>
                        <li>
                            <Row>
                                <Col>
                                    <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Blog or Website: </h3>
                                </Col>
                                <Col style = {{marginLeft : "1%"}}>
                                    <h3 style = {{fontWeight : "bolder"}}>{this.state.user.blog}</h3>
                                </Col>
                            </Row>
                        </li>
                    </ul>
                </Card>
            </li>
        </ul>
        }
        return (
            <div>
                <div>
                    <UpperRestraurantProfile />
                </div>
                <div>
                    <div className = "middleBar">
                        <div className="userDetails">
                            <div className='name'>
                                <h1 style ={{fontWeight:"bolder"}}>{this.state.fullName}</h1>
                            </div>
                            <div className="location">
                                <h3>{this.state.location}</h3>
                            </div>
                            {/* <div className="stats">
                                <Row>
                                    <Col xs = {4}>
                                    <FontAwesomeIcon style={{color:"orange",fontSize:"170%"}} icon = {faUserFriends}  />
                                    <h4 style={{color:"purple", fontWeight:"bolder", marginTop:"-16%", marginLeft:"22%"}}>{this.state.friends} Friends</h4>
                                    </Col>
                                    <Col xs = {4} style={{marginLeft:"-5%"}}>
                                        <FontAwesomeIcon style={{color:"orange",fontSize:"170%"}} icon = {faStar}  />
                                        <h4 style={{color:"purple", fontWeight:"bolder", marginTop:"-16%", marginLeft:"22%"}}>{this.state.reviews} Reviews</h4>
                                    </Col>
                                    <Col xs = {4} style={{marginLeft:"-3%"}}>
                                        <FontAwesomeIcon style={{color:"orange",fontSize:"170%"}} icon = {faCamera}  />
                                        <h4 style={{color:"purple", fontWeight:"bolder", marginTop:"-16%", marginLeft:"22%"}}>{this.state.photos} Photos</h4>
                                    </Col>
                                </Row>
                            </div> */}
                            {/* <div className = "partition">

                            </div> */}
                            {/* <div className="actions">
                                <div className="addPic">
                                    <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faCamera}  />
                                    <a style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}><Link to={{ 
                                        pathname: "/uploadPicture", 
                                        state: {source : "customer"}}}>Upload a picture</Link></a>
                                </div>
                                <div className="updateProfile">
                                    <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faIdCard}  />
                                    <a  onClick= {this.redirect} style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}>Update Profile</a>
                                </div>
                                <div className="updateProfile">
                                    <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faUserFriends}  />
                                    <a  style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}>Add Friends</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="imageDiv" >
                        <Avatar className="imageBox" shape="square" style={{height:"100%", width:"100%"}} size = 'small' src = {this.state.image}  ></Avatar>
                    </div>
                </div>
                <div style = {{marginTop : "3%", marginLeft : "20%"}}>
                    {temp}
                </div>
            </div>
        )
    }
}
// export default ViewCustomerProfile;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_customer_details: user => dispatch(get_restraurant_customer_details(user))
    };
    }
    
    function mapStateToProps(store) {
        console.log("S")
    return {
        restraurant_customer : store.restraurant_customer
    };
    }
    
    const view_customer_profile = connect(mapStateToProps, mapDispatchToProps)(ViewCustomerProfile);
    export default view_customer_profile;
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faMapMarker, faMapMarkerAlt, faStreetView } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { BACKEND } from '../../Config';
import { connect } from "react-redux";
import { getRestraurant } from '../../js/actions';
import { notification } from 'antd';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            location : [],
            user_location : ""
        }
        this.getCoordinates();
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {
            this.getUserDetails();
        }    
    }
    getUserDetails = () => {
        var user = {
            UserId : window.sessionStorage.getItem("UserId")
        }
        Axios.post(`${BACKEND}/getUserDetails`, user).then(response => {
            if(response.status === 200)
            {
                var temp = response.data.address.split(" ")
                var location = ""
                temp.map(i => {
                    location += i + "+"
                })
                location = location + "+" + response.data.zip_code
                Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ location +"&key=AIzaSyDEoT0HSUWGh-5SZhH0QE7YzRiokTDFa4I").then(response => {
                    this.setState({
                        user_location : response.data.results[0].geometry.location
                    })
                })

            }
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        });
    }

    componentDidMount() {
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {
            // this.props.getRestraurant();
            var data = []
            // setTimeout(() => {
            //     this.props.restraurants.map(i => {
            //         var location = i.location.split(" ");
            //         var temp = ""
            //         location.map(j => {
            //             temp = temp + j + "+"
            //         })
            //         temp += i.zip_code;
            //         Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ temp +"&key=AIzaSyB5f3E2sHlB_ppiVsOTX1oVaSsI9WJktss").then(response => {
            //             data.push(response.data.results[0].geometry.location)
            //         })
            //     })
            //     setTimeout(() => {
            //         this.setState({
            //             location : data
            //         })
            //     }, 100)
            // }, 500)
        }
                
    }
    componentWillReceiveProps() {
       
        setTimeout(() => {
            var data = []
            if(this.props.restraurants.length > 0)
            {
                this.props.restraurants.map(i => {
                    
                    Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ i.location +"&key=AIzaSyDEoT0HSUWGh-5SZhH0QE7YzRiokTDFa4I").then(response => {
                        console.log("~~~~~~~~~~~~~~~~~ response is ~~~~~~~~~~~~~~~~`", response)
                        var myJson = {
                            title : i.restraurant_name,
                            lat : response.data.results[0].geometry.location.lat,
                            lng : response.data.results[0].geometry.location.lng
                        }
                        data.push(myJson)
                    })
                })
                setTimeout(() => {
                    this.setState({
                        location : data
                    })
                }, 500)
            }
            
        }, 0)
    }
    getCoordinates = () => {
        Axios.get(`${BACKEND}/getAllRestraurants`).then(response => {
            if(response.status === 200)
            {
                var data = []
                response.data.map(i => {
                    var location = i.location.split(" ");
                    var temp = ""
                    location.map(j => {
                        temp = temp + j + "+"
                    })
                    temp += i.zip_code;
                    Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ temp +"&key=AIzaSyB5f3E2sHlB_ppiVsOTX1oVaSsI9WJktss").then(response => {
                        var myJson = {
                            title : i.restraurant_name,
                            lat : response.data.results[0].geometry.location.lat,
                            lng : response.data.results[0].geometry.location.lng
                        }
                        data.push(myJson)
                    })
                })
                setTimeout(() => {
                    this.setState({
                        location : data
                    })
                }, 1000)
                
            }
        })
    }    
    static defaultProps = {
        center: {
          lat: 37.336020,
          lng: -121.908290
        },
        zoom: 15
      };
    render() {
        return (
            <div>
                <div style={{ height: '100vh', width: '190%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDEoT0HSUWGh-5SZhH0QE7YzRiokTDFa4I" }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        >
                        <AnyReactComponent
                            lat={this.state.user_location.lat}
                            lng={this.state.user_location.lng}
                            title = "HEYY"
                            text = {
                                <div title = "hey">
                                    <FontAwesomeIcon title = "Your Location" style ={{fontSize : "300%", color :"red"}} icon = {faMapMarkerAlt} />
                                </div>
                            }
                        />
                        {this.state.location.map(i => {
                            return(
                                <AnyReactComponent 
                                    lat = {i.lat}
                                    lng = {i.lng}
                                    id = {i}
                                    // title = {i.title}
                                    text = {
                                        <div>
                                            <FontAwesomeIcon title = {i.title} style ={{fontSize : "300%", color :"blue"}} icon = {faMapMarkerAlt} />
                                        </div>
                                    }
                                />
                            )
                        })}
                    </GoogleMapReact>
                </div>    
            </div>
        )
    }
}
// export default GoogleMap;
function mapDispatchToProps(dispatch) {
    return {
      getRestraurant: user => dispatch(getRestraurant())
    };
  }
  
  function mapStateToProps(store) {
    return {
      
    //   user_id : store.user_id
       restraurants : store.restraurants
    };
  }
 
  const googleMap = connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
  export default googleMap;


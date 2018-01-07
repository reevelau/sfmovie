import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {GoogleApiWrapper, Map, InfoWindow, Marker, Polygon} from 'google-maps-react';

const SanFrancisco = {lat: 37.773972, lng: -122.431297};
const style = {
    width: '100%',
    height: '100%'
};
const googleGeocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json?';

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

function googleGeocodeAddressTranslate( addr, cb){
    var query = { 
        'address': addr + ', San Francisco, CA', 
        'key': 'AIzaSyAAhyuYrw1s7izDenuPj59N7J0WIFoAJ4g'
    };

    var queryString = encodeQueryData(query);

    var geocodeApiUrl = googleGeocodeApi + queryString;
    fetch(geocodeApiUrl)
        .then(response => response.json())
        .then(geocode => {
            
            var gresult = geocode.results[0];
            var result = {
                formatted_address: gresult.formatted_address,
                latlong: {
                    lat: gresult.geometry.location.lat,
                    lng: gresult.geometry.location.lng
                }
            }
            cb(result);
        })
}


export class GMapContainer extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            activeMarker: {},
            showingInfoWindow: false,
            movieInfo: {},
            markers: []
        };
    }

    componentWillReceiveProps = function(nextProps){
        //console.log(`componentWillReceiveProps :`,nextProps);
        if(nextProps.movies.length > 0){
            var self = this;
            console.log('movie info', nextProps.movies[0]);
            this.setState({movieInfo: nextProps.movies[0]});
            this.setState({markers: []});

            nextProps.movies[0].locations.forEach(function(l){
                //console.log(`location: ${l.name}`);
                googleGeocodeAddressTranslate(l.name, geocode=>{
                    geocode.title = nextProps.selectedMovie; 
                    self.state.markers.push(geocode);
                    self.setState({markers: self.state.markers});
                });
            });
        }
    }

    onMarkerClick = function(props, marker, e){
        console.log('marker clicked!: ', arguments);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    render() {
        return (
            <div>
                <h1>{this.props.selectedMovie}</h1>

                <Map google={this.props.google} zoom={12}
                    style={style}
                    initialCenter={SanFrancisco}
                    //onClick={this.onMapClicked}
                >
                    {
                        this.state.markers.map((el,index) => 
                            {
                                return <Marker
                                    onClick={this.onMarkerClick.bind(this)}
                                    onMouseover={this.onMarkerMouseOver} 
                                    key={index}
                                    title={el.title}
                                    name={el.title} position={el.latlong}/>
                            }
                        )
                    }
                    
                    
                    <InfoWindow
                            onOpen={this.onInfoWindowOpen}
                            onClose={this.onInfoWindowClose}
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                                <div>
                                    <h1> Movie Info </h1>
                                    <h2>Title : {this.props.selectedMovie}</h2>
                                    <h2>Release year: {this.state.movieInfo.release_year}</h2>
                                    <h2>Director: {this.state.movieInfo.director}</h2>
                                    <h2>actor: {this.state.movieInfo.actor_1}</h2>
                                    <h2>actor: {this.state.movieInfo.actor_2}</h2>
                                    <h2>actor: {this.state.movieInfo.actor_3}</h2>
                                    <h2>production: {this.state.movieInfo.production_company}</h2>
                                    <h2>distributor : {this.state.movieInfo.distributor}</h2>
                                    <h2>fun facts: {this.state.movieInfo.fun_facts}</h2>
                                </div>
                    </InfoWindow>

                </Map>
            </div>
        );
    }
};

GMapContainer.PropTypes = {
    movies: PropTypes.array.isRequired,
    selectedMovie: PropTypes.string.isRequired
};

GMapContainer.defaultProps = {
    movies: [],
    selectedMovie: '' 
};

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyAAhyuYrw1s7izDenuPj59N7J0WIFoAJ4g'
})(GMapContainer);
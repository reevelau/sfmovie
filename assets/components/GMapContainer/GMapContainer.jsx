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
            
            if(typeof geocode === 'undefined'
                || geocode == null
                || typeof geocode.results === 'undefined'
                || geocode.results.constructor !== Array 
                || geocode.results.length === 0       
                ){
                console.warn(`[${addr}] doesn't resolve to a geocode`);
                return;
            }
            
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
        var self = this;

        this.setState({markers: []});

        if(typeof nextProps.selectedMovie === 'undefined'
            || nextProps.selectedMovie === null    
        ){
            this.setState({movieInfo: null});
            return;
        }

        this.setState({movieInfo: nextProps.selectedMovie});
        nextProps.selectedMovie.locations.forEach(function(l){
            googleGeocodeAddressTranslate(l.name, geocode=>{
                geocode.title = nextProps.selectedMovie.title; 
                self.state.markers.push(geocode);
                self.setState({markers: self.state.markers});
            });
        });
    }

    onMarkerClick = function(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    render() {
        let movieInfoBlock = null;

        if(this.state.movieInfo !== null){
            movieInfoBlock = (
                <div class="movieInfo">
                    <h3>{this.state.movieInfo.title}</h3>
                    <p><span class="column-name">release year:</span> {this.state.movieInfo.release_year}</p>
                    <p><span class="column-name">director:</span> {this.state.movieInfo.director}</p>
                    <p><span class="column-name">actor:</span> {this.state.movieInfo.actor_1}</p>
                    <p><span class="column-name">actor:</span> {this.state.movieInfo.actor_2}</p>
                    <p><span class="column-name">actor:</span> {this.state.movieInfo.actor_3}</p>
                    <p><span class="column-name">production:</span> {this.state.movieInfo.production_company}</p>
                    <p><span class="column-name">distributor:</span> {this.state.movieInfo.distributor}</p>
                    <p><span class="column-name">fun facts:</span> {this.state.movieInfo.fun_facts}</p>
                </div>
            );
        }
        else{
            movieInfoBlock = <div />;
        }
        
        return (
            <div>
                <Map google={this.props.google} zoom={12}
                    style={style}
                    initialCenter={SanFrancisco}
                >
                    {
                        this.state.markers.map((el,index) => 
                            {
                                return <Marker
                                    onClick={this.onMarkerClick.bind(this)}
                                    onMouseover={this.onMarkerMouseOver} 
                                    key={index}
                                    title={el.formatted_address}
                                    name={el.formatted_address} position={el.latlong}/>
                            }
                        )
                    }
                    
                    <InfoWindow
                            onOpen={this.onInfoWindowOpen}
                            onClose={this.onInfoWindowClose}
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                               {movieInfoBlock} 
                    </InfoWindow>

                </Map>
            </div>
        );
    }
};

GMapContainer.PropTypes = {
    selectedMovie: PropTypes.object
};

GMapContainer.defaultProps = {
    selectedMovie: null 
};

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyAAhyuYrw1s7izDenuPj59N7J0WIFoAJ4g'
})(GMapContainer);
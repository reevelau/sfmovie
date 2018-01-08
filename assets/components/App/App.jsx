import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';

// components
import Header from 'Header/Header';
import GMapContainer from 'GMapContainer/GMapContainer'
import ReactAutocomplete from 'react-autocomplete';

const movieapi = '/movie';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchValue : '',
      selectedMovie: null
    };

  }

  searchBoxValueChange = function(e){
    var text = e.target.value;
    this.setState({ searchValue: text });
    var ctlr = this;
    var query = `?where={"title":{"contains":"${text}"}}`;
    fetch(movieapi + query)
    .then(function(response){
      return response.json();
    })
    .then(function(records){
      ctlr.setState({movies: records});
    });
  }

  searchBoxSelected = function(value){
    this.setState({ searchValue: value });
    var ctlr = this;
    var query = '/'+ encodeURIComponent(value);
    fetch(movieapi + query)
    .then(function(response){
      return response.json();
    })
    .then(function(record){
      ctlr.setState({selectedMovie: record});
      ctlr.setState({movies: []});
    });
  }

  render() {

    return (
      <div class="app">
          <div class="header">
            <h3>San Francisco Movies Locations</h3>
            <span>Enter a movie name and we will show you the relating locations in the area.</span>
          </div>
          

          <div class="auto-complete-container">
          
            <ReactAutocomplete 
              items={this.state.movies}
              //shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.title}
              renderItem={(item, highlighted) =>
                <div
                  class="drop-down-item"
                  key={item.title}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                >
                  {item.title}
                </div>
              }
              value={this.state.searchValue}
              onChange={ this.searchBoxValueChange.bind(this) }
              onSelect={ this.searchBoxSelected.bind(this)}
            />

          </div>
          <br/>
          
          <div class="map-container">
            <GMapContainer 
              selectedMovie={this.state.selectedMovie}
              />
          </div>
      </div>
    );
  }
}

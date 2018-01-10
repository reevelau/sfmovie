import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';

// components
import Header from 'Header/Header';
import GMapContainer from 'GMapContainer/GMapContainer'
import ReactAutocomplete from 'react-autocomplete';
import Loader from 'Loader/Loader';

const movieapi = '/movie';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchValue : '',
      selectedMovie: null,
      initializing: true 
    };

    var ctlr = this;
    var query = `?limit=2000`;
    fetch(movieapi + query)
    //fetch(movieapi)
    .then(function(response){
      return response.json();
    })
    .then(function(records){
      console.log(`fetched [${records.length}] numbers of record`);
      ctlr.setState({movies: records});
      ctlr.setState({initializing:false});
    });


  }

  searchBoxValueChange = function(e){
    var text = e.target.value;
    this.setState({ searchValue: text });
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
    });
  }

  shouldAutoCompleteItemRender = function(item, value){
    if(!value)
      return false;
    
    if(value === '')
      return false;

    if(item && item.title){
      if(item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1){
        return true;
      }
    }
    return false;
  }

  render() {

    return (
      <div class="app">
          {this.state.initializing? <Loader loadingMessage="We need few seconds to be well prepared." /> : null } 
          <div class="header">
            <h3>San Francisco Movies Locations</h3>
            <span class="description">Enter a movie name and we will show you the relating locations in the area.</span>
          </div>

          <div class="auto-complete-container">
            <ReactAutocomplete 
              items={this.state.movies}
              shouldItemRender={this.shouldAutoCompleteItemRender}
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

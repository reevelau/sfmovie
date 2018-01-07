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
      searchValue : ''
    };

  }

  searchBoxValueChange = function(e){
    var text = e.target.value;
    console.log(`search box changed: ${text}`);
    this.setState({ searchValue: text });
    var ctlr = this;
    var query = `?where={"title":{"contains":"${text}"}}`;
    fetch(movieapi + query)
    .then(function(response){
      return response.json();
    })
    .then(function(records){
      console.log(`fetched record: ${records.length}`);
      ctlr.setState({movies: records});
    });
  }

  searchBoxSelected = function(value){
    console.log(`search box selected: ${value}`);
    this.setState({ searchValue: value });
    //this.setState({movies: this.state.movies});
    //console.log('movies: ', JSON.stringify(this.state.movies));
  }

  render() {

    return (
      <div class="app">
        <div class="container">
          <ReactAutocomplete 
            items={this.state.movies}
            //shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.title}
            renderItem={(item, highlighted) =>
              <div
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
          <br/>

          <GMapContainer 
            movies={this.state.movies}
            selectedMovie={this.state.searchValue}
            />
          
        </div>
      </div>
    );
  }
}

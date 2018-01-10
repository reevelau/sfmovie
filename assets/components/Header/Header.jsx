import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="header">
        <h3>San Francisco Movies Locations</h3>
        <span class="description">Enter a movie name and we will show you the relating locations in the area.</span>
      </div>
    );
  }
}

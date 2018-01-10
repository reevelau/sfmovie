import React, { Component } from 'react';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="loader-layer">
        <div class="loader"></div>
        <div class="loader-message">{this.props.loadingMessage}</div>
      </div>
    );
  }
}
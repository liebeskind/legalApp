import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

export default class MainContent extends Component {

  constructor(props) {
    super(props);
  }

  renderContent() {
    if (this.props.mainContentSelector === 'documentManager') {
      return (
        <div></div>
      )
    }
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
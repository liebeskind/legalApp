import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.updateName = this.updateName.bind(this);
  }

  render() {

    return (
      <div>
        {this.props.children[this.props.selected]}
      </div>
    )
  }
}
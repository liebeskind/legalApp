import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.updateName = (key, value) => {
      console.log(key)
      console.log(value)
    }
  }

  content() {
    return React.Children.map(this.props.children, child =>
      console.log(child)
    );
  }

  render() {
    return (
      <div>
        {this.content()}
        {this.props.children[this.props.selected]}
      </div>
    )
  }
}
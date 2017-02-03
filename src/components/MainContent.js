import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

import DocumentManager from '../components/DocumentManager';
import CompanyManager from '../components/CompanyCreator';
import DirectorsAndOfficers from '../components/DirectorsAndOfficers';

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.updateName = this.updateName.bind(this);
  }

  updateName(key, value) {
    console.log(key)
    console.log(value)
    this.props.sigs[key].name = value
  }

  render() {
    return (
      <DirectorsAndOfficers updateName={this.updateName} sigs={this.props.sigs} />
    )
  }
}
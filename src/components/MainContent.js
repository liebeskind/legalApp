import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

import DocumentManager from '../components/DocumentManager';
import CompanyManager from '../components/CompanyCreator';
import DirectorsAndOfficers from '../components/DirectorsAndOfficers';


export default class MainContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DocumentManager />
    )
  }
}
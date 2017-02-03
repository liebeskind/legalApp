import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import {update} from 'react-addons-update';

//components
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import DocumentManager from '../components/DocumentManager';
import DirectorsAndOfficers from '../components/DirectorsAndOfficers';
import CompanyCreator from '../components/CompanyCreator';
import SideNav from '../components/SideNav';
import { bindAll } from '../components/util';

//containers

class App extends Component { //Functional component isn't aware of state and doesn't have to render or handle data flow
  constructor(props) {
    super(props);

    // bind local functions
    bindAll(['updateName', 'onSave', 'onSideNavClick', 'uploadFile'], this);

    this.selected = {
      DocumentManager: 0,
      CompanyCreator: 1,
      DirectorsAndOfficers: 2
    };
    this.state = {
      videos: [],
      loaded: {sigs: {}, companies: {}, documents: {}, officers: {}},
      selectedName: 'DocumentManager'
    };
  }

  componentWillMount() {
    // this.props.fetchBenefitList();
  }

  uploadFile(e) {
    var reader = new FileReader();

    reader.onload = function() {
      // probably want to show some kind of success! indicator
      this.setState({loaded: JSON.parse(reader.result)});
    }.bind(this)

    reader.readAsText(e.target.files[0]);
  }

  // In Chrome, this requires setting "Ask where to save each file before downloading" or it will save to default
  onSave() {
    let name = 'Cascade_' + (new Date).getTime() + '.json';
    let blob = new Blob([JSON.stringify(this.state.loaded)], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, name);
  }

  onSideNavClick(name) {
    this.setState({selectedName: name});
  }

  updateName(key, value) {
    let loaded = this.state.loaded;
    loaded.sigs = loaded.sigs || {};
    loaded.sigs[key] = loaded.sigs[key] || {};
    loaded.sigs[key].name = value
    this.setState({loaded})
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <NavBar />
          <div className="mainContainer">
            <button onClick={this.onSave} type='button'>Save</button>
            <input type="file" id="input" onChange={this.uploadFile} />
            <div className="sideNavContainer" >
              <SideNav onClick={this.onSideNavClick} items={Object.keys(this.selected)} />
            </div>
            <div className="mainContentContainer">
              <MainContent selected={this.selected[this.state.selectedName]} loaded={this.state.loaded}>
                <DocumentManager />
                <CompanyCreator />
                <DirectorsAndOfficers sigs={this.state.loaded.sigs} updateName={this.updateName} />
              </MainContent>
            </div>
          </div>
          <Footer companyName="Legal App" />
        </div>
      </MuiThemeProvider>
    );
  }
};

function mapStateToProps(state) {
  return {
    // benefitList: state.benefitList,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // fetchBenefitList: actions.fetchBenefitList,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

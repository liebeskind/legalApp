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

//containers

class App extends Component { //Functional component isn't aware of state and doesn't have to render or handle data flow
  constructor(props) {
    super(props);
    this.updateSigName = this.updateSigName.bind(this);
    this.updateCompanyName = this.updateCompanyName.bind(this);
    this.updateSignatoryTitle = this.updateSignatoryTitle.bind(this);
    this.selectSignatory = this.selectSignatory.bind(this);
    this.selected = {
      DocumentManager: 0,
      CompanyCreator: 1,
      DirectorsAndOfficers: 2
    };
    this.state = {
      videos: [],
      loaded: {sigs: {}, companies: {}, documents: {}, officersOfCompany: {}},
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

  updateSigName(key, value) {
    let loaded = this.state.loaded;
    loaded.sigs = loaded.sigs || {};
    loaded.sigs[key] = loaded.sigs[key] || {};
    loaded.sigs[key].name = value
    this.setState({loaded})
  }

  updateCompanyName(key, value) {
    let loaded = this.state.loaded;
    loaded.companies = loaded.companies || {};
    loaded.companies[key] = loaded.companies[key] || {};
    loaded.companies[key].name = value
    this.setState({loaded})
  }

  selectSignatory(company, signatoryKey, selected) {
    let loaded = this.state.loaded;
    loaded.officersOfCompany = loaded.officersOfCompany || {};
    loaded.officersOfCompany[company] = loaded.officersOfCompany[company] || {};
    loaded.officersOfCompany[company][signatoryKey] = loaded.officersOfCompany[company][signatoryKey] || {};
    loaded.officersOfCompany[company][signatoryKey].selected = selected;
    this.setState({loaded})
  }

  updateSignatoryTitle(company, signatoryKey, title) {
    let loaded = this.state.loaded;
    loaded.officersOfCompany = loaded.officersOfCompany || {};
    loaded.officersOfCompany[company] = loaded.officersOfCompany[company] || {};
    loaded.officersOfCompany[company][signatoryKey] = loaded.officersOfCompany[company][signatoryKey] || {};
    loaded.officersOfCompany[company][signatoryKey].title = title;
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <NavBar />
          <div className="mainContainer">
            <button onClick={this.onSave.bind(this)} type='button'>Save</button>
            <input type="file" id="input" onChange={this.uploadFile.bind(this)} />
            <div className="sideNavContainer" >
              <SideNav onClick={this.onSideNavClick.bind(this)} items={Object.keys(this.selected)} />
            </div>
            <div className="mainContentContainer">
              <MainContent selected={this.selected[this.state.selectedName]} loaded={this.state.loaded}>
                <DocumentManager />
                <CompanyCreator companies={this.state.loaded.companies} sigs={this.state.loaded.sigs} officersOfCompany={this.state.loaded.officersOfCompany} selectSignatory={this.selectSignatory} updateSignatoryTitle={this.updateSignatoryTitle} updateCompanyName={this.updateCompanyName} />
                <DirectorsAndOfficers sigs={this.state.loaded.sigs} updateSigName={this.updateSigName} />
              </MainContent>
            </div>
          </div>
          <Footer companyName="Cascade" />
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

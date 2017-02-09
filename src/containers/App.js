import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

// import {update} from 'react-addons-update';

//components
import MainContent from '../components/MainContent';
import DocumentManager from '../components/DocumentManager';
import DirectorsAndOfficers from '../components/DirectorsAndOfficers';
import CompanyCreator from '../components/CompanyCreator';
import SideNav from '../components/SideNav';
import { bindAll } from '../helpers/util';
import { generatePDF } from '../helpers/pdf';
// import Footer from '../components/Footer';

const companyName = "DocRedux"

class App extends Component { //Functional component isn't aware of state and doesn't have to render or handle data flow
  constructor(props) {
    super(props);

    // bind local functions
    bindAll(['updateSigName', 'updateCompanyName', 'onSave', 'onExport', 'onSideNavClick', 'uploadFile', 'updateSignatoryTitle', 'selectSignatory', 'sendDocumentUpdate', 'updateDocumentSelections'], this);

    this.selected = {
      DocumentManager: 0,
      CompanyCreator: 1,
      DirectorsAndOfficers: 2
    };
    this.state = {
      videos: [],
      loaded: {sigs: {}, companies: {}, documents: {}, officersOfCompany: {}, companiesPerDocument: {}},
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
    let name = 'DocRedux_' + (new Date).getTime() + '.json';
    let blob = new Blob([JSON.stringify(this.state.loaded)], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, name);
  }

  // Should this also save? Would two files be confusing?
  onExport() {
    generatePDF(this.state.loaded);
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

  sendDocumentUpdate(key, footerTitle, agreementType) {
    let loaded = this.state.loaded;
    loaded.documents = loaded.documents || {};
    loaded.documents[key] = loaded.documents[key] || {};
    loaded.documents[key].agreementType = agreementType;
    loaded.documents[key].footerTitle = footerTitle;
    this.setState({loaded})
  }

  updateDocumentSelections(documentKey, companyKey, asField, signatory) {
    let loaded = this.state.loaded;
    loaded.companiesPerDocument = loaded.companiesPerDocument || {};
    loaded.companiesPerDocument[documentKey] = loaded.companiesPerDocument[documentKey] || {};
    loaded.companiesPerDocument[documentKey][companyKey] = loaded.companiesPerDocument[documentKey][companyKey] || {};
    loaded.companiesPerDocument[documentKey][companyKey].asField = asField
    loaded.companiesPerDocument[documentKey][companyKey].signatory = signatory
    this.setState({loaded})
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <div className="mainContainer">
            <button onClick={this.onSave} type='button'>Save</button>
            <button onClick={this.onExport} type='button'>Export to PDF</button>
            <input type="file" id="importFile" onChange={this.uploadFile} />
            <div className="sideNavContainer" >
              <SideNav onClick={this.onSideNavClick} items={Object.keys(this.selected)} />
            </div>
            <div className="mainContentContainer">
              <MainContent selected={this.selected[this.state.selectedName]} loaded={this.state.loaded}>
                <DocumentManager documents={this.state.loaded.documents} loaded={this.state.loaded} sendDocumentUpdate={this.sendDocumentUpdate} updateDocumentSelections={this.updateDocumentSelections} selectSignatory={this.selectSignatory} />
                <CompanyCreator companies={this.state.loaded.companies} sigs={this.state.loaded.sigs} officersOfCompany={this.state.loaded.officersOfCompany} selectSignatory={this.selectSignatory} updateSignatoryTitle={this.updateSignatoryTitle} updateCompanyName={this.updateCompanyName} />
                <DirectorsAndOfficers sigs={this.state.loaded.sigs} loaded={this.state.loaded} updateSigName={this.updateSigName} />
              </MainContent>
            </div>
          </div>
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

import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

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
    this.selected = {
      DocumentManager: 0,
      CompanyCreator: 1,
      DirectorsAndOfficers: 2
    };
    this.state = {
      videos: [],
      loaded: { // would be an empty object
        sigs: {
          sigX: {name: 'John'},
          sigY: {name: 'Sally'},
          sigZ: {name: 'Ted'}
        },
        companies: {
          compX: {name: 'Google'},
          compY: {name: 'Exxon'},
          compZ: {name: 'Target'}
        },
        officers: {
          compX: {
            sigX: 'Director',
            sigZ: 'Benefactor'
          }
        },
        documents: {
          x: {
            footerTitle: 'Doc 1',
            agreementType: 'Notary'
          },
          y: {
            footerTitle: 'Doc 2',
            agreementType: 'Will'
          }
        }
      },
      selectedName: 'DocumentManager'
    };
  }

  componentWillMount() {
    // this.props.fetchBenefitList();
  }

  // In Chrome, this requires setting "Ask where to save each file before downloading" or it will save to default
  onSave() {
    let blob = new Blob([JSON.stringify(this.state.loaded)], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'savedLegal.txt');
  }

  onSideNavClick(name) {
    console.log(name);
    this.setState({selectedName: name});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <button onClick={this.onSave.bind(this)} type='button'>Save</button>
          <SideNav onClick={this.onSideNavClick.bind(this)} items={Object.keys(this.selected)} />
          <MainContent selected={this.selected[this.state.selectedName]} loaded={this.state.loaded}>
            <DocumentManager />
            <CompanyCreator />
            <DirectorsAndOfficers />
          </MainContent>
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
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
    this.updateName = this.updateName.bind(this);
    this.selected = {
      DocumentManager: 0,
      CompanyCreator: 1,
      DirectorsAndOfficers: 2
    };
    this.state = {
      videos: [],
      loaded: { // would be an empty object
        sigs: {
          sigX: {name: 'John Wilcox'},
          sigY: {name: 'Sally Shoemaker'},
          sigZ: {name: 'Ted Bundy'}
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
      selectedName: 'DirectorsAndOfficers'
    };
  }

  componentWillMount() {
    // this.props.fetchBenefitList();
  }

  onSideNavClick(name) {
    console.log(name);
    this.setState({selectedName: name});
  }

  updateName(key, value) {
    let loaded = this.state.loaded;
    loaded.sigs[key].name = value
    this.setState({loaded})
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <NavBar />
          <div className="mainContainer">
            <div className="sideNavContainer" >
              <SideNav onClick={this.onSideNavClick.bind(this)} items={Object.keys(this.selected)} />
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
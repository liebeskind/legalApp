import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

//components
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';

//containers
import SideNav from '../containers/SideNav';

class App extends Component { //Functional component isn't aware of state and doesn't have to render or handle data flow
	constructor(props) {
		super(props);
		this.state = {
			videos: []
		};
	}

	componentWillMount() {
		// this.props.fetchBenefitList();
  }

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<NavBar />
					<SideNav />
					<MainContent mainContentSelector={'DocumentManager'} />
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
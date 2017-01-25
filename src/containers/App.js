import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

//components
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import GridList from '../components/grid_list';

import FoodCard from '../containers/food_card'

class App extends Component { //Functional component isn't aware of state and doesn't have to render or handle data flow
	constructor(props) {
		super(props);
		this.state = {
			videos: []
		};
	}

	componentWillMount() {
    this.props.fetchCompanyCampaignInfo('testCompany');
  }

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<NavBar />
					<FoodCard />
					<GridList />
					<Footer companyName="Superfood App" />
				</div>
			</MuiThemeProvider>
		);
	}
};

function mapStateToProps(state) {
	return {campaignInfo: state.campaignInfo}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		fetchCompanyCampaignInfo: actions.fetchCompanyCampaignInfo
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

//components
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import EditProducts from '../containers/edit_products';
import CardController from '../containers/card_controller';

class App extends Component { //Functional component isn't aware of state and doesn't have to render or handle data flow
	constructor(props) {
		super(props);
		this.state = {
			videos: []
		};
	}

	componentWillMount() {
		this.props.fetchSuperfoodNames();
		this.props.fetchSuperfoodType();
		this.props.fetchTypeOptions();
    // this.props.fetchCompanyCampaignInfo('testCompany');
  }

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<NavBar />
					<EditProducts foodNames={this.props.superfoodNames} foodTypes={this.props.superfoodType} typeOptions={this.props.typeOptions} />
					<CardController />
					<Footer companyName="Superfood App" />
				</div>
			</MuiThemeProvider>
		);
	}
};

function mapStateToProps(state) {
	return {
		superfoodNames: state.superfoodNames,
		superfoodType: state.superfoodType,
		typeOptions: state.typeOptions,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		fetchSuperfoodNames: actions.fetchSuperfoodNames,
		fetchSuperfoodType: actions.fetchSuperfoodType,
		fetchTypeOptions: actions.fetchTypeOptions,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
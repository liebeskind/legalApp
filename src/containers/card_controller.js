import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import GridList from '../components/grid_list';
import FoodCard from '../containers/food_card'

class CardController extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div>
				<FoodCard />
				<GridList />
			</div>
		)
	}
}

//Receive data from reducers
function mapStateToProps(state) {
	return {
		campaignInfo: state.campaignInfo,
		recordingStatus: state.recordingStatus
	}
}

//Send things to 'actions'
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		recordingStatusChanged: actions.recordingStatusChanged,
		audioOnlyChanged: actions.audioOnlyChanged
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CardController)
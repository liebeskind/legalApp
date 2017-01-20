import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

//containers
import WidgetBody from './widget_body';
import WidgetHeader from './widget_header';

//components
import CloseButton from '../components/close_button';
import WidgetFooter from '../components/widget_footer';

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

  renderHeader() {
  	if (!this.props.campaignInfo) return <div>Loading...</div>
  		return <WidgetHeader videoCaption={this.props.campaignInfo.videoCaption} />
  }

	render() {
		return (
			<div>
				<div id="truetalk-container">
					
					<div id="truetalk-window">
						<CloseButton color={"blue"} />
						{this.renderHeader()}
						<WidgetBody />
						<WidgetFooter />
					</div>
				</div>
			</div>
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
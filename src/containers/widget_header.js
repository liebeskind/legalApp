import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//Component
import RecordingContainer from '../components/recording_container';
import AvatarHeader from '../components/avatar_header';

//images
// import speaking from '../img/speaking.jpg';

class WidgetHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	renderVideo() {
		console.log(this.props.recordingStatus)
		if (this.props.recordingStatus === 'pre_record') {
			const teamRecordingStyle = {
			  // backgroundImage: 'url(' + speaking + ')',
			};
			return <RecordingContainer videoCaption={this.props.videoCaption} imageStyle={teamRecordingStyle} />
		} else {
			return
		}
	}

	render() {
		
		return (
			<div className="superfood-header">
				<AvatarHeader />
				{this.renderVideo()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		campaignInfo: state.campaignInfo,
		recordingStatus: state.recordingStatus
	}
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ 
// 		fetchCompanyCampaignInfo: actions.fetchCompanyCampaignInfo
// 	}, dispatch)
// }

export default connect(mapStateToProps, actions)(WidgetHeader)
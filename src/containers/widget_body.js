import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//Component
import BodyButton from '../components/body_button';

//Images
import audioIcon from '../img/icon-audio.png';
import videoIcon from '../img/icon-video.png';

class WidgetBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	getImage() {
		return this.props.audioOnly ? audioIcon : videoIcon;
	}

	renderButton() {
		switch (this.props.recordingStatus) {
			case 'ready_to_record':
				return <BodyButton buttonText={"Start"} clicked={() => this.props.recordingStatusChanged('record')} buttonImg={this.getImage()} />
				break;
			case 'recording':
				return <BodyButton buttonText={"Stop"} clicked={() => this.props.recordingStatusChanged('stop_recording')} buttonImg={this.getImage()} />
				break;
			case 'record':
				return <BodyButton buttonText={"Starting..."} buttonImg={this.getImage()} />
				break;
			case 'stop_recording':
				return (
					<div>
						<BodyButton buttonText={"Submit"} clicked={() => this.props.recordingStatusChanged('submit_recording')} buttonImg={this.getImage()} />
					</div>
				)
				break;
			default:
			return (
				<div>
					<BodyButton buttonText={"Video"} clicked={() => {
						this.props.recordingStatusChanged('begin_record'); 
						this.props.audioOnlyChanged(false);}
					} buttonImg={videoIcon} />
					<BodyButton buttonText={"Audio"} clicked={() => {
						this.props.recordingStatusChanged('begin_record'); 
						this.props.audioOnlyChanged(true);}
					} buttonImg={audioIcon} />
				</div>
			)
		}
	}

	renderText() {
		switch (this.props.recordingStatus) {
			case 'ready_to_record':
				return "Tell us what you think"
				break;
			case 'record':
				return "Tell us what you think"
				break;
			case 'stop_recording':
				return "Review and submit"
				break;
			default:
				return "Reply with audio or video"
		}
	}

	render() {
		return (
			<div className="truetalk-body">
				<div className="truetalk-body-container">
					<div className="truetalk-body-content">
						<div className="truetalk-body-h1">{this.renderText()}</div>
						<div className="truetalk-body-p"></div>
					</div>
					<div className="truetalk-body-cta">
						{this.renderButton()}
					</div>
				</div>
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		recordingStatusChanged: actions.recordingStatusChanged,
		audioOnlyChanged: actions.audioOnlyChanged
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetBody)
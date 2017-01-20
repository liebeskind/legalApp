import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import Countdown from '../components/countdown'
import RecordingImage from '../components/recording_image'

class ZiggeoRecorder extends Component { //{video} is same thing as (props.video)
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			companyName: this.props.companyName,
			embedding: {}
		}
	}

	componentDidMount() {
		var embedding = ZiggeoApi.Embed.embed("#"+this.state.id, {
			tags:[this.state.companyName], 
			disable_first_screen:true,
			disable_device_test:true,
			disable_snapshots:true,
			limit:180,
			incognito:true,
			// height: 210,
			// width: 280,
			// face_outline: true,
			responsive: true,
			countdown: 0,
			immediate_playback: true,
			loop: true,
			autoplay: true,
			auto_pad: true
		});


		this.setState({embedding})
		ZiggeoApi.Events.on("ready_to_record", this.readyToRecord.bind(this));
		ZiggeoApi.Events.on("recording", this.recordingStarted.bind(this));

		ZiggeoApi.Events.on("error_recorder", function (data, error) {
			console.log(error)
		});

		// ZiggeoApi.Events.on("countdown", function (time, data) {
		// 	console.log(time)
		// 	this.setState({countdown: time})
		// }.bind(this));
  }

  componentDidUpdate() {
		if (this.props.recordingStatus === 'record') this.state.embedding.record();
		if (this.props.recordingStatus === 'stop_recording') this.state.embedding.stopRecord();
		if (this.props.recordingStatus === 're_record') this.state.embedding.rerecord();
  }

  recordingStarted() {
  	console.log("Recording started");
  	this.props.recordingStatusChanged('recording');
  }

  readyToRecord() {
  	if (this.props.audioOnly) {
			var videoDiv = document.getElementById(this.state.id);
			videoDiv.className += ' truetalk-audio-only';
			var blackOverlay = document.createElement('div');
			blackOverlay.id = "black-overlay";
			videoDiv.appendChild(blackOverlay);
		} else {
			var videoDiv = document.getElementById(this.state.id);
			var overlayDiv = document.getElementById('black-overlay');
			if (overlayDiv) videoDiv.removeChild(overlayDiv)
		}
  	this.props.recordingStatusChanged('ready_to_record');
  }

  render() {
  	if (this.props.recordingStatus === 'pre_record') {
			return (
				<div className="truetalk-team-recording-container">
					<div className="truetalk-team-recording" id={this.state.id} style={this.props.imageStyle}>
						<div className="truetalk-team-recording-overlay"></div>
						<div className="truetalk-team-recording-question">{this.props.videoCaption}</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="truetalk-user-recording-container">
					<div className="truetalk-user-recording" id={this.state.id} style={this.props.imageStyle}>
						<Countdown secondsRemaining={this.state.countdown} />
						<RecordingImage />
						<div className="truetalk-recording-overlay"></div>
						<div className="truetalk-team-recording-question">{this.props.videoCaption}</div>
					</div>
				</div>
			)
		}
	}
}


function mapStateToProps(state) {
	return {
		campaignInfo: state.campaignInfo,
		recordingStatus: state.recordingStatus,
		audioOnly: state.audioOnly
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		recordingStatusChanged: actions.recordingStatusChanged
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ZiggeoRecorder)


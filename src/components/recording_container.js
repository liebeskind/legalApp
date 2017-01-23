import React, { Component } from 'react';

// import volumeBars from '../img/volumebars.png';

export default class RecordingContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		if (!this.props.videoCaption) this.props.videoCaption = "Loading..."
	}

	render() {
		return (
			<div className="superfood-team-recording-container">
				<div className="superfood-team-recording" style={this.props.imageStyle}>
					<div className="superfood-team-recording-overlay"></div>
					<div className="superfood-team-recording-question">{this.props.videoCaption}</div>
					<div className="superfood-team-recording-sound">
						// <img src={volumeBars} />
					</div>
				</div>
			</div>
		)
	}
}
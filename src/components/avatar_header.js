import React, { Component } from 'react';

export default class AvatarHeader extends Component {
	render() {
		return (
			<div className="truetalk-team-avatar-container">
				<div className="truetalk-team-avatar-img">
					<img src="https://www.getbodyapp.com/assets/images/justin-photo.jpg" />
				</div>
				<div className="truetalk-team-avatar-title">
					<div className="truetalk-team-avatar-title-name">Justin Mendelson</div>
					<div className="truetalk-team-avatar-title-company">Team BODY</div>
				</div>
			</div>
		)
	}
}
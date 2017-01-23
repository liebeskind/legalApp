import React, { Component } from 'react';

export default class AvatarHeader extends Component {
	render() {
		return (
			<div className="superfood-team-avatar-container">
				<div className="superfood-team-avatar-img">
					<img src="https://www.getbodyapp.com/assets/images/justin-photo.jpg" />
				</div>
				<div className="superfood-team-avatar-title">
					<div className="superfood-team-avatar-title-name">Justin Mendelson</div>
					<div className="superfood-team-avatar-title-company">Team BODY</div>
				</div>
			</div>
		)
	}
}
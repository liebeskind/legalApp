import React, {Component} from 'react'

export default class BodyButton extends Component {
	render() {
		return (
			<div className="truetalk-body-button" onClick={this.props.clicked}>
				<img src={this.props.buttonImg} />
				{this.props.buttonText}
			</div>
		)
	}
}
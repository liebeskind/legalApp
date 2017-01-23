import React, {Component} from 'react'

export default class CloseButton extends Component {
	closeWidget() {

	}

	render() {
		return (
			<div>
				<div className="superfood-closeButton" onClick={this.closeWidget.bind(this)}>close x</div>
			</div>
		)
	}
}

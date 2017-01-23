import React, {Component} from 'react'

export default class WidgetFooter extends Component {
	render() {
		return (
		<div className="superfood-footer">
			<div className="superfood-footer-container">
				<div className="superfood-footer-details">
          <div className="superfood-footer-details-clickable">How it works</div>
          <div>&nbsp;|&nbsp;</div>
          <div className="superfood-footer-details-clickable">Privacy</div>
        </div>
				<div className="superfood-footer-powered">Powered by TrueTalk</div>
			</div>
		</div>
		)
	}
}


import React, {Component} from 'react'

export default class WidgetFooter extends Component {
	render() {
		return (
		<div className="truetalk-footer">
			<div className="truetalk-footer-container">
				<div className="truetalk-footer-details">
          <div className="truetalk-footer-details-clickable">How it works</div>
          <div>&nbsp;|&nbsp;</div>
          <div className="truetalk-footer-details-clickable">Privacy</div>
        </div>
				<div className="truetalk-footer-powered">Powered by TrueTalk</div>
			</div>
		</div>
		)
	}
}


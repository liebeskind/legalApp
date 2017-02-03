import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

export default class Footer extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Grid>
				  <hr />
				  <footer>
				    <p>© {this.props.companyName} {new Date().getFullYear()}</p>
				  </footer>
				</Grid>
			</div>
		)
	}
}
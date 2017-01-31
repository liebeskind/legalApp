import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [];
for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

export default class BenefitSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		}
	}

	handleChange = (event, index, value) => {
    this.setState({value});
  };

	render() {
		if (!this.props.show) return <div></div>
		return (
			<div>
				<SelectField
	        value={this.state.value}
	        onChange={this.handleChange}
	      >
	        {items} 
	      </SelectField>
      </div>
		)
	}
}
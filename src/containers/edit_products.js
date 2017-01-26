import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const itemsArray = [];
const itemsObject = [];

const items = [];
for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

class EditProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 2
		}
		this.mapObject = this.mapObject.bind(this)
		this.renderItem = this.renderItem.bind(this)
	}

	componentWillMount() {
		this.props.fetchSuperfoodNames();
		this.props.fetchSuperfoodType();
	}

	handleChange = (event, index, value) => {
    this.setState({value});
  };

	mapObject(object, callback) {
	  return Object.keys(object).map(function (key) {
	    return callback(key, object[key]);
	  });
	}

	renderItem(item, itemKey) {
		return (
			this.mapObject(item, function (key, value) {
				itemsArray.push(<MenuItem value={value} key={key} primaryText={`Hi {value}`} />);
				itemsObject[itemKey] = value;
			  // return <div>{value}</div>;
			})
		)
	}

	render() {
		return (
			<div>
				<SelectField
	        value={this.state.value}
	        onChange={this.handleChange}
	        maxHeight={200}
	      >
	      	{this.renderItem(this.props.superfoodNames, 'name')}
	        {items} 
	      </SelectField>
      </div>
		)
	}
}

//Receive data from reducers
function mapStateToProps(state) {
	return {
		superfoodNames: state.superfoodNames,
		superfoodType: state.superfoodType
	}
}

//Send things to 'actions'
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		fetchSuperfoodNames: actions.fetchSuperfoodNames,
		fetchSuperfoodType: actions.fetchSuperfoodType
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProducts)
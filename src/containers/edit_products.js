import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class EditProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodChoice: 'acai'
		}
		this.mapObject = this.mapObject.bind(this);
		this.renderSelectItemList = this.renderSelectItemList.bind(this);
	}

	componentWillMount() {
	}

	handleFoodChoiceChange = (event, index, foodChoice) => {
    this.setState({foodChoice});
    this.setState({showProductCard: foodChoice});   
  };

  handleSelectedTypeChange = (event, index, selectedType) => {
    this.setState({selectedType});
    this.props.setSelectedFoodType(this.state.showProductCard, selectedType);
  };

	mapObject(object, callback) {
	  return Object.keys(object).map(function (key) {
	    return callback(key, object[key]);
	  });
	}

	renderSelectItemList(item) {
		return (
			this.mapObject(item, function (key, value) {
				return <MenuItem value={key} key={key} primaryText={`${value}`} />;
			  // return <div>{value}</div>;
			})
		)
	}

	renderProductCard() {
		console.log(this.state.showProductCard)
		if (!this.state.showProductCard) return
		return (
			<div>
				<SelectField
	        value={this.props.foodTypes[this.state.showProductCard]}
	        onChange={this.handleSelectedTypeChange}
	        maxHeight={200}
	      >
	        {this.renderSelectItemList(this.props.typeOptions)} 
	      </SelectField>
				<TextField floatingLabelText="Description" />
				<TextField floatingLabelText="Side Effects" />
				<TextField floatingLabelText="Fun Facts" />
			</div>
		)
	}

	render() {
		return (
			<div>
				<SelectField
	        value={this.state.foodChoice}
	        onChange={this.handleFoodChoiceChange}
	        maxHeight={200}
	      >
	        {this.renderSelectItemList(this.props.foodNames)} 
	      </SelectField>
	      {this.renderProductCard(this.state.showProductCard)}
      </div>
		)
	}
}

//Receive data from reducers
function mapStateToProps(state) {
	return {
	}
}

//Send things to 'actions'
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setSelectedFoodType: actions.setSelectedFoodType,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProducts)
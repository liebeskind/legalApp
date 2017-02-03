import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { bindAll } from '../components/util';

import BenefitTable from '../components/benefit_table';

class EditProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodChoice: 'acai'
    }

    bindAll(['mapObject', 'renderSelectItemList', 'setDescription', 'setFunFacts', 'setSideEffects'], this);
  }

  componentWillMount() {
  }

  handleFoodChoiceChange = (event, index, foodChoice) => {
    this.setState({foodChoice});
    this.setState({showProductCard: foodChoice});
    this.props.getSelectedDescription(foodChoice);
    this.props.getSelectedFunFacts(foodChoice);
    this.props.getSelectedSideEffects(foodChoice);
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

  setDescription(event) {
    this.props.setSelectedDescription(this.state.showProductCard, event.target.value)
  }

  setFunFacts(event) {
    this.props.setSelectedFunFacts(this.state.showProductCard, event.target.value)
  }

  setSideEffects(event) {
    this.props.setSelectedSideEffects(this.state.showProductCard, event.target.value)
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
        <BenefitTable setSelectedBenefitValue={this.props.setSelectedBenefitValue} benefitList={this.props.benefitList} />
        <TextField value={this.props.selectedDescription} onChange={this.setDescription} multiLine={true} rows={2} rowsMax={6} floatingLabelText="Description" />
        <TextField value={this.props.selectedSideEffects} onChange={this.setSideEffects} multiLine={true} rows={2} rowsMax={4} floatingLabelText="Side Effects" />
        <TextField value={this.props.selectedFunFacts} onChange={this.setFunFacts} multiLine={true} rows={2} rowsMax={4} floatingLabelText="Fun Facts" />
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
    // selectedSideEffects: state.selecSideEffects,
  }
}

//Send things to 'actions'
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // setSelectedBenefitValue: actions.setSelectedBenefitValue,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProducts)

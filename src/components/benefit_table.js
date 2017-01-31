import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import BenefitImpactSelector from '../components/benefit_impact_selector';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class BenefitTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: {}
		}
		this.renderRow = this.renderRow.bind(this);
		this.mapObject = this.mapObject.bind(this);
		this.benefitClicked = this.benefitClicked.bind(this);
		this.renderCheckbox = this.renderCheckbox.bind(this);
	}

	mapObject(object, callback) {
	  return Object.keys(object).map((key) => {
	    return callback(key, object[key]);
	  });
	}

	benefitClicked = (key, checkedTracker) => {
		var checkedTemp = this.state.checked;
		checkedTemp[key] = checkedTracker
		this.setState({checked: checkedTemp})
	}

	renderCheckbox(key) {
		
	}

	renderRow(items) {
		return (
			this.mapObject(items, (key, value) => {
				return (
					<div>
					<ListItem
          leftCheckbox={<Checkbox onCheck={(event, checked)=>this.benefitClicked(key, checked)} key={key} value={key} />}
          primaryText={value}
          key={key}
          value={key}
          >
          </ListItem> 
          <BenefitImpactSelector show={this.state.checked[key]} />
          </div>
		    )
			})
		)
	}

	render() {
		return (
		  <div style={styles.root}>
		    
		      <List>
		        <Subheader>Health Benefits</Subheader>
		        {this.renderRow(this.props.benefitList)}
		      </List>
		    
		  </div>
	  )
	}

}
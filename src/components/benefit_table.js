import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class BenefitTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.renderRow = this.renderRow.bind(this);
		this.mapObject = this.mapObject.bind(this);
	}

	mapObject(object, callback) {
	  return Object.keys(object).map(function (key) {
	    return callback(key, object[key]);
	  });
	}

	renderRow(items) {
		return (
			this.mapObject(items, function (key, value) {
				return (
					<TableRow>		      
			      <TableRowColumn>{value}</TableRowColumn>
			    </TableRow>	    
		    )
			})
		)
	}

	render() {
		return (
		  <Table>
		    <TableHeader>
		      <TableRow>
		        <TableHeaderColumn>ID</TableHeaderColumn>
		        <TableHeaderColumn>Name</TableHeaderColumn>
		        <TableHeaderColumn>Status</TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody>
		    	{this.renderRow(this.props.benefitList)}
		    </TableBody>
		  </Table>
	  )
	}

}
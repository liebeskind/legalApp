import React, {Component} from 'react';
import { bindAll } from '../helpers/util';

import AddButton from '../components/AddButton';
import TextField from 'material-ui/TextField';

//UI Materials components
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class CompanyToDocumentUtility extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      updatedAsField: false,
      selectedSig: false
    }

    bindAll(['mapObject', 'renderPanelHeader', 'renderPanelBody', 'renderPanels', 'updateDocumentSelections', 'renderSelectSignatoryList', 'renderSelectCompanyList', 'renderSignatory', 'selectSignatory', 'selectCompany', 'addCompany'], this);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  editItem(key) {
    this.setState({editing: key})
    if (key && this.props && this.props.companiesPerDocument && this.props.companiesPerDocument[this.props.documentEditing] && this.props.companiesPerDocument[this.props.documentEditing][key]) {
      this.setState({updatedAsField: this.props.companiesPerDocument[this.props.documentEditing][key].asField})
    } else {
      this.setState({updatedAsField: false, selectedSig: false})
    }
  }

  addCompany() {
    this.setState({editing: true})
  }

  renderEditPanel() {
    if (!this.state.editing) return <div></div>
    return (
      <div className="panel space-4">
        {this.renderEditHeader()}
        {this.renderEditBody()}
      </div>
    )
  }

  renderEditHeader() {
    const name = this.props.companies[this.state.editing] ? this.props.companies[this.state.editing].name : false;
    const addEditToggle = name ? <span >Edit {name}</span> : <span >Add Company </span>
    return (
      <div className="panel-header">
        {addEditToggle}

        <ul className="panel-action-list">
          <li>
            <a href="#" className="panel-action-item" onClick = {()=>this.editItem(false)}><img src="../src/img/close.svg" /></a>
          </li>
        </ul>
      </div>
    )
  }

  asFieldChanged = (event) => {
    this.setState({updatedAsField: event.target.value})
  }

  updateDocumentSelections() {
    this.props.updateDocumentSelections(this.props.documentEditing, this.state.editing, this.state.updatedAsField, this.state.selectedSig)
    this.setState({editing: false, updatedAsField: false, selectedSig: false})
  }

  renderSelectSignatoryList(items) {
    if (!items) return
    var sigs = this.props.sigs;
    return (
      this.mapObject(items, function (key, value) {
        if (!value.selected) return
        return <MenuItem value={key} key={key} primaryText={`${sigs[key].name} | ${value.title}`} />;
      })
    )
  }

  selectSignatory(event, index, selectedType) {
    this.setState({selectedSig: selectedType})
    this.props.selectSignatory(this.props.documentEditing, this.state.editing, this.state.selectedType);
  }

  renderSelectCompanyList(items) {
    if (!items) return
    var companiesOnDocumentAlready = this.props.companiesPerDocument[this.props.documentEditing]
    return (
      this.mapObject(items, function (key, value) {
        if (companiesOnDocumentAlready && companiesOnDocumentAlready[key]) return; //Don't want to have companies already added show up in the select list.
        return <MenuItem value={key} key={key} primaryText={`${value.name}`} />;
      })
    )
  }

  selectCompany(event, index, selectedCompany) {
    this.setState({editing: selectedCompany})
  }

  renderName(name) {
    if (!name) {
      return (
        <h5 className="lightgray mb0">Select Company
          <SelectField
            value={this.state.editing}
            onChange={this.selectCompany}
            maxHeight={200}
          >
            {this.renderSelectCompanyList(this.props.companies)}
          </SelectField>
        </h5>
      )
    } else {
      return <h5 className="lightgray mb0">Name: {name}</h5>
    }
  }

  renderEditBody() {
    let key = this.state.editing;
    let name = this.props.companies[this.state.editing] ? this.props.companies[this.state.editing].name : false;
    let asField = this.state.updatedAsField ? this.state.updatedAsField : '';
    var currentValue

    if (this.state.selectedSig) {
      currentValue = this.props.sigs[this.state.selectedSig];
      // currentValue = this.props.sigs[this.state.selectedSig].name + " | " + this.props.officersOfCompany[this.state.editing][this.state.selectedSig].title;
    } else if (this.props.companiesPerDocument && this.props.companiesPerDocument[this.props.documentEditing] && this.props.companiesPerDocument[this.props.documentEditing][this.state.editing] && this.props.companiesPerDocument[this.props.documentEditing][this.state.editing].signatory) {
      this.setState({selectedSig: this.props.companiesPerDocument[this.props.documentEditing][this.state.editing].signatory})
    }

    return (
      <div>
        <div className="panel-body">
          <div className="row space-4">
            <div className="col-xs-12">
              {this.renderName(name)}
              <h5 className="lightgray mb0">As (optional): <TextField id={key?key:''} value={asField} onChange={this.asFieldChanged} /></h5>
              <h5 className="lightgray mb0">Signatory
                <SelectField
                  value={this.state.selectedSig}
                  onChange={this.selectSignatory}
                  maxHeight={200}
                >
                  {this.renderSelectSignatoryList(this.props.officersOfCompany[this.state.editing])}
                </SelectField>
              </h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ul className="panel-action-list">
              <li>
                <a href="#" onClick = {()=>this.editItem(false)} className="panel-action-item">Cancel</a>
              </li>
              <li>
                <a href="#" onClick = {this.updateDocumentSelections} className="panel-action-item btn-primary btn">Save</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderPanels() {
    if (!this.props.companies) return <div></div>
    return (
      this.mapObject(this.props.companies, (key, value) => {
        if (key === this.state.editing || !this.props.companiesPerDocument || !this.props.companiesPerDocument[this.props.documentEditing] || !this.props.companiesPerDocument[this.props.documentEditing][key]) return <div></div>
        return (
          <div className="panel" key={key} id={key}>
            {this.renderPanelHeader(key, value)}
            {this.renderPanelBody(key, value)}
          </div>
        )
      })
    )
  }

  renderPanelHeader(key, value) {
    return (
      <div className="panel-header">
        {value.name}
        <ul className="panel-action-list">
          <li>
            <a href="#" className="panel-action-item" onClick = {()=>this.editItem(key)}>Edit</a>
          </li>
        </ul>
      </div>
    )
  }

  renderAsField(key) {
    if (this.props.companiesPerDocument && this.props.companiesPerDocument[this.props.documentEditing] && this.props.companiesPerDocument[this.props.documentEditing][key] && this.props.companiesPerDocument[this.props.documentEditing][key].asField) {
      return (
        <h5 className="lightgray mb0">As: {this.props.companiesPerDocument[this.props.documentEditing][key].asField}</h5>
      )
    } else {
      return <span></span>
    }

  }

  renderSignatory(key) {
    if (this.props.companiesPerDocument && this.props.companiesPerDocument[this.props.documentEditing] && this.props.companiesPerDocument[this.props.documentEditing][key] && this.props.companiesPerDocument[this.props.documentEditing][key].signatory) {
        // <h5 className="lightgray mb0">Signatory: {this.props.sigs[this.props.companiesPerDocument[this.props.documentEditing][key].signatory].name} | {this.props.officersOfCompany[this.props.companiesPerDocument[this.props.documentEditing][key].signatory].title}</h5>
      return (
        <h5 className="lightgray mb0">Signatory: {this.props.sigs[this.props.companiesPerDocument[this.props.documentEditing][key].signatory].name}</h5>
      )
    } else {
      return (
        <h5 className="lightgray mb0">No Signatory Selected</h5>
      )
    }

  }

  renderPanelBody(key, value) {
    return (
      <div className="panel-body">
        <div className="row mb16">
          <div className="col-xs-12">
            <h5 className="lightgray mb0">Company: {value.name}</h5>
            {this.renderAsField(key)}
            {this.renderSignatory(key)}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <AddButton hide={this.state.editing} actionFunction={this.addCompany} actionText={"Add Company"} />
        {this.renderEditPanel()}
        {this.renderPanels()}
      </div>
    )
  }
}

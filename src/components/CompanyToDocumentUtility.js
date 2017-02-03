import React, {Component} from 'react';

import AddButton from '../components/AddButton';
import TextField from 'material-ui/TextField';

//UI Materials components
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

export default class CompanyToDocumentUtility extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      updatedAsField: false
    }

    this.mapObject = this.mapObject.bind(this);
    this.renderPanelHeader = this.renderPanelHeader.bind(this);
    this.renderPanelBody = this.renderPanelBody.bind(this);
    this.renderPanels = this.renderPanels.bind(this);
    this.updateAsField = this.updateAsField.bind(this);
    this.addCompany = this.addCompany.bind(this);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  editItem(key) {
    console.log(key)
    this.setState({editing: key})
    if (key && this.props && this.props.companiesPerDocument && this.props.companiesPerDocument[this.props.documentEditing] && this.props.companiesPerDocument[this.props.documentEditing][key]) {
      this.setState({updatedAsField: this.props.companiesPerDocument[this.props.documentEditing][key].asField})
    } else {
      this.setState({updatedAsField: false})
    }
  }

  generateKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  addCompany() {
    let key = "Company" + this.generateKey();
    this.setState({editing: key})
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
    console.log(this.props.companies)
    console.log(this.state.editing)
    console.log(this.props.companies[this.state.editing])
    const name = this.props.companies[this.state.editing].name;
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

  updateAsField() {
    this.props.updateAsField(this.props.documentEditing, this.state.editing, this.state.updatedAsField)
    this.setState({editing: false, updatedAsField: false})
  }

  renderEditBody() {
    let key = this.state.editing;
    let name = this.props.companies[this.state.editing].name;
    let asField = this.state.updatedAsField ? this.state.updatedAsField : '';

    return (
      <div>
        <div className="panel-body">
          <div className="row space-4">
            <div className="col-xs-12">
              <h5 className="lightgray mb0">Name: {name}</h5>
              <h5 className="lightgray mb0">As (optional): <TextField id={key} value={asField} onChange={this.asFieldChanged} /></h5>
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
                <a href="#" onClick = {this.updateAsField} className="panel-action-item btn-primary btn">Save</a>
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
        if (key === this.state.editing) return <div></div>
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
      console.log("As Detected")
      return (
        <h5 className="lightgray mb0">As: {this.props.companiesPerDocument[this.props.documentEditing][key].asField}</h5>
      )
    } else {
      console.log("No As Detected")
      return <span></span>
    }

  }

  renderPanelBody(key, value) {
    return (
      <div className="panel-body">
        <div className="row mb16">
          <div className="col-xs-12">
            <h5 className="lightgray mb0">Company: {value.name}</h5>
            {this.renderAsField(key)}
            <h5 className="lightgray mb0">Signatory: Name | Title</h5>
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

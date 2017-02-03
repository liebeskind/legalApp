import React, {Component} from 'react';

import AddButton from '../components/AddButton';
import TextField from 'material-ui/TextField';

export default class CompanyCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      updatedName: false
    }

    this.mapObject = this.mapObject.bind(this);
    this.renderPanelHeader = this.renderPanelHeader.bind(this);
    this.renderPanelBody = this.renderPanelBody.bind(this);
    this.renderPanels = this.renderPanels.bind(this);
    this.updateName = this.updateName.bind(this);
    this.addCompany = this.addCompany.bind(this);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  editItem(key) {
    this.setState({editing: key})
    if (key && this.props && this.props.companies && this.props.companies[key]) {
      this.setState({updatedName: this.props.companies[key].name}) 
    } else {
      this.setState({updatedName: false}) 
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
    console.log(this.state.editing)
    return (
      <div className="panel space-4">
        {this.renderEditHeader()}
        {this.renderEditBody()}
      </div>
    )
  }

  renderEditHeader() {
    const name = this.state.updatedName;
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

  nameChanged = (event) => {
    this.setState({updatedName: event.target.value})
  }

  updateName() {
    this.props.updateCompanyName(this.state.editing, this.state.updatedName)
    this.setState({editing: false, updatedName: false})
  }

  renderEditBody() {
    let key = this.state.editing ? this.state.editing : 1;
    let name = this.state.updatedName ? this.state.updatedName : '';

    return (
      <div>
        <div className="panel-body">
          <div className="row space-4">
            <label className="col-sm-3">
              Name: 
            </label>
            <div className="col-sm-9">
              <TextField id={key} value={name} onChange={this.nameChanged} />
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
                <a href="#" onClick = {this.updateName} className="panel-action-item btn-primary btn">Save</a>
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

  renderPanelBody(key, value) {
    return (
      <div className="panel-body">
        <div className="row mb16">
          <div className="col-xs-12">
            <h5 className="lightgray mb0">Name: {value.name}</h5>
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
  
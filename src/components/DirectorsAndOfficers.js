import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

//Components
import AddButton from '../components/AddButton'
import { bindAll } from './util';

export default class DirectorsAndOfficers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      updatedName: false
    }
    bindAll(['mapObject', 'renderPanelHeader', 'renderPanelBody', 'renderPanels', 'updateName', 'addSignatory'], this);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  editItem(key) {
    this.setState({editing: key})
    key ? this.setState({updatedName: this.props.sigs[key].name}) : this.setState({updatedName: false})
  }

  generateKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  addSignatory() {
    let key = "Sig" + this.generateKey();
    this.setState({editing: key})
    // key &&  ? this.setState({updatedName: this.props.sigs[key].name}) : this.setState({updatedName: false})
  }

  renderEditPanel() {
    if (!this.state.editing) return
    return (
      <div className="panel space-4">
        {this.renderEditHeader()}
        {this.renderEditBody()}
      </div>
    )
  }

  renderEditHeader() {
    const name = this.state.updatedName;
    const addEditToggle = name ? <span >Edit {name}</span> : <span >Add Signatory </span>
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
    console.log(event.target.value);
    this.setState({updatedName: event.target.value})
  }

  updateName() {
    this.props.updateSigName(this.state.editing, this.state.updatedName)
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
    if (!this.props.sigs) return <div></div>
    return (
      this.mapObject(this.props.sigs, (key, value) => {
        if (key === this.state.editing) return
        return (
          <div className="panel" key={key}>
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
        <AddButton hide={this.state.editing} actionFunction={this.addSignatory} actionText={"Add Signatory"} />
        {this.renderEditPanel()}
        {this.renderPanels()}
      </div>
    )
  }
}

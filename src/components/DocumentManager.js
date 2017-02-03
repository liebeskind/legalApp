import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

//Components
import AddButton from '../components/AddButton'
import { bindAll } from './util';

export default class DocumentManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      updatedFooterTitle: false
    }
    bindAll(['mapObject', 'renderPanelHeader', 'renderPanelBody', 'renderPanels', 'updateFooterTitle', 'addDocument'], this);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  editItem(key) {
    this.setState({editing: key})
    key ? this.setState({updatedFooterTitle: this.props.documents[key].name}) : this.setState({updatedFooterTitle: false})
  }

  generateKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  addDocument() {
    let key = "Document" + this.generateKey();
    this.setState({editing: key})
    // key &&  ? this.setState({updatedFooterTitle: this.props.documents[key].name}) : this.setState({updatedFooterTitle: false})
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
    const name = this.props.documents[this.state.editing].footerTitle;
    const addEditToggle = name ? <span >Edit {name}</span> : <span >Add Document </span>
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
    this.setState({updatedFooterTitle: event.target.value})
  }

  updateFooterTitle() {
    this.props.updateFooterTitle(this.state.editing, this.state.updatedFooterTitle)
    this.setState({editing: false, updatedFooterTitle: false})
  }

  renderEditBody() {
    let key = this.state.editing ? this.state.editing : 1;
    // let name = this.props.documents[this.state.editing].footerTitle;
    let name = this.state.updatedFooterTitle ? this.state.updatedFooterTitle : this.props.documents[this.state.editing].footerTitle;

    return (
      <div>
        <div className="panel-body">
          <div className="col-xs-12">
            <h5 className="lightgray mb0">Document Title: <TextField id={key} value={name} onChange={this.nameChanged} /></h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ul className="panel-action-list">
              <li>
                <a href="#" onClick = {()=>this.editItem(false)} className="panel-action-item">Cancel</a>
              </li>
              <li>
                <a href="#" onClick = {this.updateFooterTitle} className="panel-action-item btn-primary btn">Save</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderPanels() {
    if (!this.props.documents) return <div></div>
    return (
      this.mapObject(this.props.documents, (key, value) => {
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
        {value.footerTitle}
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
            <h5 className="lightgray mb0">Document Title: {value.footerTitle}</h5>
            <h5 className="lightgray mb0">Agreement Type: {value.agreementType}</h5>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <AddButton hide={this.state.editing} actionFunction={this.addDocument} actionText={"Add Document"} />
        {this.renderEditPanel()}
        {this.renderPanels()}
      </div>
    )
  }
}

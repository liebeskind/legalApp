import React, {Component} from 'react';

export default class PanelHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.updatedName;
    const addEditToggle = name ? <span >Edit {name}</span> : <span >Add Signatory </span> 
    return (
      <div className="panel-header">
        {addEditToggle}
        
        <ul className="panel-action-list">
          <li>
            <a href="#" className="panel-action-item" onClick = {this.props.rightAction}><img src="../src/img/close.svg" /></a>
          </li>
        </ul>
      </div>
    )
  }
}
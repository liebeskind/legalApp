import React, {Component} from 'react';

export default class AddButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.hide) return <div></div>
    return (
      <div className="subpanel-btn">
        <a href="#" onClick = {this.props.actionFunction}>{this.props.actionText}<img className="arrowIcon" src="../src/img/arrow-circle-right.svg" /></a>
      </div>
    )
  }
}

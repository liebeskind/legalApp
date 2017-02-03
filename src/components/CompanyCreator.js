import React, {Component} from 'react';

import AddButton from '../components/AddButton'

export default class CompanyCreator extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <AddButton hide={this.editing} actionFunction={this.addCompany} actionText={"Add Company"} />
        {this.renderEditPanel()}
        {this.renderPanels()}
      </div>
    )
  }
}
  
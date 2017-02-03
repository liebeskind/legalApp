import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { bindAll } from './util';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

export default class SideNav extends Component {

  constructor(props) {
    super(props);

    bindAll(['getFormattedText'], this);
  }

  getFormattedText(text) {
    return {
      DocumentManager: 'Document Manager',
      CompanyCreator: 'Company Creator',
      DirectorsAndOfficers: 'Directors and Officers'
    }[text] || text;
  }

  render() {
    return (
      <div>
        <Paper style={style}>
          <Menu>
            {this.props.items.map((text) =>
              <MenuItem primaryText={this.getFormattedText(text)} key={text} onClick={() => this.props.onClick(text)} />
            )}
          </Menu>
        </Paper>
      </div>
    )
  }
}

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

export default class SideNav extends Component {

  constructor(props) {
    super(props);
    this.getFormattedText = this.getFormattedText.bind(this);
  }

  getFormattedText(text) {
    if (text === 'DocumentManager') return "Document Manager";
    if (text === 'CompanyCreator') return "Company Creator";
    if (text === 'DirectorsAndOfficers') return "Directors and Officers";
    return text;
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
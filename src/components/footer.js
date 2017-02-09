import React, {Component} from 'react';

export default class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <hr />
        <footer>
          <p>© {this.props.companyName} {new Date().getFullYear()}</p>
        </footer>
      </div>
    )
  }
}

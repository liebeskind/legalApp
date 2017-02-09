import React, {Component} from 'react';

export default class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const date = new Date().getFullYear();
    return (
      <div>
        <hr />
        <footer>
          <p> {"©"+this.props.companyName} {date}</p>
        </footer>
      </div>
    )
  }
}

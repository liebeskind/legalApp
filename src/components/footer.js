import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.companyName
    }
    // console.log(this.state)
    // this.setState({ secondsRemaining: this.props.secondsRemaining });
    // this.interval = setInterval(this.tick.bind(this), 1000);
  }

  render() {
    return (
      <div>
        <Grid>
          <hr />
          <footer>
            <p>© {this.state.companyName} {new Date().getFullYear()}</p>
          </footer>
        </Grid>
      </div>
    )
  }
}
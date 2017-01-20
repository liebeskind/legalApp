import React, {Component} from 'react'

export default class Countdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondsRemaining: this.props.secondsRemaining
		}
		// console.log(this.state)
		// this.setState({ secondsRemaining: this.props.secondsRemaining });
    // this.interval = setInterval(this.tick.bind(this), 1000);
	}

	// componentDidMount() {
    
 //  }

  // tick() {
  //   this.setState({secondsRemaining: this.state.secondsRemaining - 1});
  //   console.log(this.state.secondsRemaining)
  //   if (this.state.secondsRemaining <= 0) {
  //     clearInterval(this.interval);
  //   }
  // }

	// componentWillUnmount() {
 //    clearInterval(this.interval);
 //  }

	render(){
		return (
			<div>
				<div className="truetalk-recording-countdown-time">{this.state.secondsRemaining}</div>
			</div>
		)
	}
}
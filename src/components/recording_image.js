import React, {Component} from 'react'
import imageUrl from '../img/icon-recording.png';

export default class RecordingImage extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div className="truetalk-recording-live">
          <img src={imageUrl} />
      </div>
		)
	}
}

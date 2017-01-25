import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import GridTile from '../components/card_expanded'

import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import RaisedButton from 'material-ui/RaisedButton'
import {GridList} from 'material-ui/GridList';

const styles = {
  overlay: {
  	top:0,
  	bottom:'auto',
  	textAlign: 'center',
  },
  actionButton: {
	  position: 'absolute',
	  // display: 'block',
	  width: '30%',
	  maxWidth: '30%,',
	  minWidth: '30%,',
	  left: '35%',
	  top: "5%",
	  // marginLeft: '-125px',
  },
  buttonLabel: {
  	fontSize: "24px",
  	color: 'white'
  },
  attributeButton1: {
	  position: 'absolute',
	  width: '30%',
	  maxWidth: '40%',
	  minWidth: '40%',
	  left: '30%',
	  top: '20%',
	  opacity: '0.85',
	  borderRadius: '20px'
  },
  attributeButton2: {
	  position: 'absolute',
	  width: '30%',
	  maxWidth: '40%',
	  minWidth: '40%',
	  left: '30%',
	  top: '30%',
		opacity: '0.85',
		borderRadius: '20px'
  },
  attributeButton3: {
	  position: 'absolute',
	  width: '30%',
	  maxWidth: '40%',
	  minWidth: '40%',
	  left: '30%',
	  top: '40%',
	  opacity: '0.85',
	  borderRadius: '20px'
  }
};

const FoodCard = () => (
	<Card initiallyExpanded={false}>
	<CardMedia
      overlayContentStyle={styles.overlay}
      expandable={false}
      overlay={<CardTitle title="Reishi" subtitle="Mushroom" />}
    >
      <img src="src/img/reishi.jpg" />
      <div className="cardContentWrapper">
	      <RaisedButton label="Shop Online" labelStyle={styles.buttonLabel} primary={true} buttonStyle={styles.actionButton} />
	      <RaisedButton label="Anti-Aging" labelStyle={styles.buttonLabel} backgroundColor="#4848F0" buttonStyle={styles.attributeButton1} />
	      <RaisedButton label="Men's Health" labelStyle={styles.buttonLabel} backgroundColor="#4848F0" buttonStyle={styles.attributeButton2} />
	      <RaisedButton label="Bone Health" labelStyle={styles.buttonLabel} backgroundColor="#4848F0" buttonStyle={styles.attributeButton3} />
	      <div className="leftTextBox">
	      	<h3 className="leftText" id="descriptionId">Description</h3>
	      	<p className="leftText" id="leftTextContent">
	      		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	      	</p>
	      </div>
	      <div className="rightTextBox">
		      <h3 className="rightText" id="secondaryBenefitsId">Secondary Benefits</h3>
		      <p className="rightText rightTextContent" id="secondaryBenefitsContent">
		      	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
		      </p>
		      <h3 className="rightText" id="sideEffectsId">Side Effects</h3>
		      <ul className="rightText rightTextContent" id="sideEffectsContent">
	      		<li>Lorem ipsum dolor sit amet</li>
	      		<li>Lorem ipsum dolor sit amet</li>
	      		<li>Lorem ipsum dolor sit amet</li>
		      </ul>
		      <h3 className="rightText" id="funFactsId">Fun Facts</h3>
		      <ul className="rightText rightTextContent" id="funFactsContent">
	      		<li>Lorem ipsum dolor sit amet</li>
	      		<li>Lorem ipsum dolor sit amet</li>
	      		<li>Lorem ipsum dolor sit amet</li>
		      </ul>
	      </div>
      </div>
    </CardMedia>
    <CardTitle expandable={true} title="Description" />
    <CardText expandable={true}>
      This is a basic description of Reishi and its incredible healing power.
    </CardText>
    <CardActions expandable={true}>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);

export default FoodCard;
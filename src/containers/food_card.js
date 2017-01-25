import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import GridTile from '../components/card_expanded'

import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import RaisedButton from 'material-ui/RaisedButton'
import {GridList} from 'material-ui/GridList';

const buttonStyle = {
  position: 'absolute',
  display: 'block',
  width: '250px',
  left: '50%',
  top: '100px',
  marginLeft: '-125px',
};

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: window.innerWidth,
    height: window.innerHeight,
    // overflowY: 'auto',
  },
};

const labelStyle = {
	fontSize: "24px",
}

const FoodCard = () => (
		<GridTile
      key= "123456" //Change this
      title= "Reishi"
      primaryBenefit1="Antioxidant"
      primaryBenefit2="Anti-Aging"
      primaryBenefit3="Women's Health"
      subtitle= "Mushroom"
      actionIcon={<IconButton><FavoriteBorder viewBox="0 0 22 22" color="white" /></IconButton>}
      actionPosition="right"
      percentage="90%"
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      
    >
    	<img src="src/img/reishi.jpg"/>
    	<RaisedButton label="More Info" labelStyle={labelStyle} labelPosition="after" primary={true} style={buttonStyle} />
      
    </GridTile>
);

export default FoodCard;
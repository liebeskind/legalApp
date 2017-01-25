import React from 'react';
import {GridList} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import GridTile from '../components/card_list'
import FoodCard from '../containers/food_card'

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

const tilesData = [
  {
    img: 'src/img/goji.png',
    title: 'Goji',
    author: 'Berry'
  },
  {
    img: 'src/img/kava.jpg',
    title: 'Kava',
    author: 'Root',
  },
  {
    img: 'src/img/maca.jpg',
    title: 'Maca',
    author: 'Root',
  },
  {
    img: 'src/img/reishi.jpg',
    title: 'Reishi',
    author: 'Mushroom',
  },
  {
    img: 'src/img/shiitake.jpg',
    title: 'Shiitake',
    author: 'Mushroom',
  },
  {
    img: 'src/img/turmeric.jpg',
    title: 'Turmeric',
    author: 'Spice',
  },
  {
    img: 'src/img/maca.png',
    title: 'Maca',
    author: 'Root',
  },
];

/**
 * This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile.
 * The tiles have a customised title, positioned at the top and with a custom gradient `titleBackground`.
 */
const GridListComplex = () => (
  <div style={styles.root}>
    <GridList
      cols={2}
      cellHeight={window.innerHeight/2}
      padding={1}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img} //Change this
          title={tile.title}
          primaryBenefit1="Antioxidant"
          primaryBenefit2="Anti-Aging"
          primaryBenefit3="Women's Health"
          subtitle={tile.author}
          actionIcon={<IconButton><FavoriteBorder color="white" /></IconButton>}
          actionPosition="right"
          percentage="90%"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={1}
          // rows={tile.featured ? 2 : 1}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListComplex;
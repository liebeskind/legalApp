import React from 'react';
import {GridList} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import GridTile from '../containers/grid_tile'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: window.innerWidth,
    height: window.innerHeight,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'src/img/goji.png',
    title: '100%',
    author: 'jill111',
    featured: true
  },
  {
    img: 'src/img/kava.jpg',
    title: '95%',
    author: 'pashminu',
  },
  {
    img: 'src/img/maca.jpg',
    title: '92%',
    author: 'Danson67',
  },
  {
    img: 'src/img/reishi.jpg',
    title: '91%',
    author: 'fancycrave1',
  }
];

/**
 * This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile.
 * The tiles have a customised title, positioned at the top and with a custom gradient `titleBackground`.
 */
const GridListExampleComplex = () => (
  <div style={styles.root}>
    <GridList
      cols={3}
      cellHeight={window.innerHeight/3}
      padding={1}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><FavoriteBorder color="white" /></IconButton>}
          actionPosition="right"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 3 : 1}
          rows={tile.featured ? 2 : 1}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListExampleComplex;
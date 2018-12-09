import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  LinearProgress
} from '@material-ui/core';
import { object } from 'prop-types';

import { donateToArtifact } from '../util';

function styles(theme) {
  return {
    card: {
      width: '100%'
    },
    actionArea: {
      width: '100%'
    },
    media: {
      objectFit: 'cover',
      width: '100%'
    },
    progress: {
      marginBottom: theme.spacing.unit
    },
    actions: {
      float: 'right'
    },
    description: {
      height: '110px',
      overflowY: 'scroll'
    },
    title: {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
      // background: 'blue'
    }
  };
}

function RestorationCard(props) {
  const { restoration, classes } = props;
  const { image, description } = restoration;
  return (
    <Card className={classes.card}>
      {/* <CardActionArea className={classes.actionArea}> */}
      <CardMedia
        component="img"
        alt="Artifact"
        className={classes.media}
        height="180"
        image={image}
      />
      <CardContent>{description}</CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}

RestorationCard.propTypes = {
  classes: object.isRequired,
  restoration: object.isRequired
};

export default withStyles(styles)(RestorationCard);

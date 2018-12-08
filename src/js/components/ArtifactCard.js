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

function ArtifactCard(props) {
  const { artifact, classes, onClick } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={onClick} className={classes.actionArea}>
        <CardMedia
          component="img"
          alt="Artifact"
          className={classes.media}
          height="140"
          image={artifact.coverImage}
          title={artifact.name}
        />
        <CardContent>
          <Typography gutterBottom variant="subheading" component="h2" className={classes.title}>
            {artifact.name}
          </Typography>
          <Typography paragraph className={classes.description}>
            {artifact.description}
          </Typography>
          <LinearProgress
            className={classes.progress}
            variant="determinate"
            value={(artifact.amountDonated / artifact.amountNeeded) * 100}
          />
          <Typography variant="caption" align="center">
            €{artifact.amountDonated} / €{artifact.amountNeeded}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary">
          Like
        </Button>
        <Button size="small" color="primary" onClick={donateToArtifact(artifact.id)}>
          Donate
        </Button>
      </CardActions>
    </Card>
  );
}

ArtifactCard.propTypes = {
  classes: object.isRequired,
  artifact: object.isRequired
};

export default withStyles(styles)(ArtifactCard);

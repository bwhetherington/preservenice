import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  withMobileDialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { donateToArtifact } from '../util';

function styles(theme) {
  return {
    description: {
      // minWidth: '600px'
    },
    close: {
      marginLeft: theme.spacing.unit * 3,
      float: 'right'
    },
    media: {
      objectFit: 'cover',
      width: '100%',
      height: '250px'
    }
  };
}

/**
 * This component renders a page for the artifact with the specified artifact ID.
 * @param {object} props
 */
function Artifact(props) {
  const { fullScreen, open, onClose, artifact, classes } = props;
  const { name, description, id, coverImage } = artifact;
  // const image = `https://s3.amazonaws.com/cityknowledge/testimages/${id}-thumb.jpg`;
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>
        {name}
        <span className={classes.close}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </span>
      </DialogTitle>
      <DialogContent>
        <img className={classes.media} src={coverImage} />
        <DialogContentText className={classes.description}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Like</Button>
        <Button color="primary" onClick={donateToArtifact(id)}>
          Donate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Artifact.propTypes = {
  classes: object.isRequired,
  artifact: object.isRequired
};

export default withMobileDialog()(withStyles(styles)(Artifact));

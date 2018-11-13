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

function styles(_) {
  return {
    description: {
      // minWidth: '600px'
    },
    close: {
      float: 'right'
    }
  };
}

/**
 * This component renders a page for the artifact with the specified artifact ID.
 * @param {object} props
 */
function Artifact(props) {
  const { fullScreen, open, onClose, artifact, classes } = props;
  const { name, description } = artifact;
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
        <DialogContentText className={classes.description}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Share</Button>
        <Button color="primary">Donate</Button>
      </DialogActions>
    </Dialog>
  );
}

Artifact.propTypes = {
  classes: object.isRequired,
  artifact: object.isRequired
};

export default withMobileDialog({ breakpoint: 'md' })(withStyles(styles)(Artifact));

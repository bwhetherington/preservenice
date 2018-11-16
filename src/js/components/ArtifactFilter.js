import React from 'react';
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

function styles(theme) {
  return {};
}

function ArtifactFilter(props) {
  const { fullScreen, open, onClose, filter, classes } = props;
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

export default withMobileDialog()(withStyles(styles)(ArtifactFilter));

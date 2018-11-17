import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  withMobileDialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@material-ui/core';

function styles(theme) {
  return {};
}

function ArtifactFilter(props) {
  const { fullScreen, open, onClose, filter, classes } = props;
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>
        Search
        <span className={classes.close}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </span>
      </DialogTitle>
      <DialogContent>
        <TextField>

        </TextField>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Share</Button>
        <Button color="primary">Donate</Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * Syntax:
 * 
 * fn square x = x * x;
 * fn add x y = x + y;
 * 
 * fn do_something x y = {
 *   let c = x ^ y;
 *   println "c = {}" c;
 *   c * x * y
 * }
 * 
 * 
 * 
 * println "Hello world";
 * let x = add 10 2;
 */

export default withMobileDialog()(withStyles(styles)(ArtifactFilter));

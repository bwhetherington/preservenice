import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

function styles(theme) {
  return {
    separator: {
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3
    }
  };
}
/**
 * The separator is a simple line with spacing above and below it.
 */
function Separator(props) {
  const { classes } = props;
  return (
    <div className={classes.separator}>
      <Divider />
    </div>
  );
}

Separator.protoTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Separator);

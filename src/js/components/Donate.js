import React from 'react';
import Page from './Page';

import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

function styles(_) {
  return {};
}

/**
 * This component renders the PreserVenice website's contact page.
 */
function Contact(_) {
  return (
    <Page selected="donate">
      <Typography>PreserVenice is not currently ready to take donations.</Typography>
    </Page>
  );
}

Contact.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Contact);

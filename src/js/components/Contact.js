import React from 'react';
import Page from './Page';

import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import Separator from './Separator';

function displayInsta() {
  const instafeedTarget = 'instafeed';
  return (
    <div id={instafeedTarget}>
      <Instafeed
        limit="5"
        ref="instafeed"
        resolution="standard_resolution"
        sortBy="most-recent"
        target={instafeedTarget}
        template=""
        userId="4579871973"
        clientId="614e0f4342ad44ceb9c88598322aa9f7"
        accessToken="4579871973.1677ed0.4ae63d8c7e474620a0984df098a9e360"
      />
    </div>
  );
}

function styles(_) {
  return {};
}

/**
 * This component renders the PreserVenice website's contact page.
 */
function Contact(_) {
  return (
    <Page selected="contact">
      <Typography variant="headline" align="center">
        Contact Us
      </Typography>
      <Separator />
      <Typography paragraph align="center">
        Follow our Instagram at:{' '}
        <a href="https://www.instagram.com/preservenice/?hl=en">@preservenice</a>
      </Typography>
      <Typography paragraph align="center">
        Like us on Facebook: <a href="https://www.facebook.com/preservenice/">Facebook</a>
        {/**TODO add real link to facebook and email! */}
      </Typography>
      <Typography paragraph align="center">
        Email us: <a href="ve18.pv@gmail.com">ve18.pv@gmail.com</a>
      </Typography>
    </Page>
  );
}

Contact.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Contact);

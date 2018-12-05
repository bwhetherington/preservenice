import React from 'react';
import Page from './Page';
import Separator from './Separator';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { object } from 'prop-types';

const styles = theme => ({});

/**
 * A dummy about page.
 */
function About({ classes }) {
  return (
    <Page selected="about">
      <div className={classes.root}>
        <Typography variant="headline" align="center">
          About PreserVenice
        </Typography>
        <Separator />
        <Typography paragraph>
          PreserVenice is a non-profit organization devoted to the preservation and restoration of
          public art in Venice, Italy. Please help us preserve this inestimable collection by using
          our App to collect up-to-date information about the artifacts and to donate funds for
          their restoration.
        </Typography>
        <Typography paragraph variant="title" align="left">
          Background
        </Typography>
        <Typography paragraph>
          The city of Venice, Italy contains a large and unique collection of artifacts that are
          displayed on public view, dating as far back as the year 700 AD. The collection includes
          reliefs, roundels, confraternity insignia, coats of arms, flagpole pedestals,
          inscriptions, wellheads, street altars, and a variety of other secular and religious
          symbols of Venice's material culture. These artifacts have been largely neglected by the
          numerous preservation efforts that have been undertaken since the historic flood of 1966.
          This vernacular heritage, which records the various stages of the thousand-year evolution
          of Venice's history from the perspective of the citizens of yesteryear, is being saved by
          today's citizens through a combination of high technology, social networks, and citizen
          engagement.
        </Typography>
        <Typography variant="title" align="left">
          PreserVenice is a non-profit organization based in Venice, Italy. Our goals:
        </Typography>
        <Typography paragraph>
          <ul>
            <li>Identify and prioritize at-risk Venetian public art objects.</li>
            <li>
              Solicit donations from the general public using crowdfunding techniques and new
              technological tools.
            </li>
            <li>When sufficient funds have been raised, oversee the restoration of objects.</li>
          </ul>
        </Typography>
        <Typography paragraph variant="title" align="left">
          Where did the data come from?
        </Typography>
        <Typography paragraph>
          The primary sources for these data are the catalogs of Alberto Rizzi, surveys by
          volunteers from the Earthwatch Institute, and the work of university students from
          Worcester Polytechnic Institute. During the past 25 years, extensive surveys have been
          conducted in Venice and the islands of its lagoon, and virtually every type of public art
          has been cataloged and verified under the guidance of Archeoclub d'Italia, one of the
          pre-eminent heritage preservation organizations in Italy.
          <ul>
            <li>A Computerized Catalog of Flagstaff Pedestals in Venice, Italy (1997)</li>
            <li>A Computerized Catalog of Outdoor Art in Dorsoduro, Venice (1995)</li>
            <li>
              A Computerized Catalog of the Well-heads of Venice In the Sestiere of Dorsoduro (1995)
            </li>
            <li>An Archeological and Analytical Study of Venetian Church Floors (2004)</li>
            <li>An Outdoor Art Inventory of the San Marco Sestiere (1993)</li>
            <li>Church Floors in Venice, Italy: An Archeological Study and Analysis (2002)</li>
            <li>Computerized Catalog of Venetian Decorative Keystones (1995)</li>
            <li>Embedded Heritage: a study of Venetian Church Floors (2005)</li>
            <li>Exploring the history of Venice - relics, records, and relations (2010)</li>
            <li>Outdoor Art Inventory of the Sestiere di Castello (1994)</li>
            <li>
              Portali e Lunette: A Multimedia Catalog for the Preservation of Venice's Artistic
              Entrances (2002)
            </li>
            <li>
              Preservation and Restoration of Venetian Public Art - From the Completion of the
              Public Art Catalog to the Active Restoration Process (2003)
            </li>
            <li>PreserVenice: Preserving the Material Culture of Venice (2011)</li>
            <li>PreserVenice: Preserving Venetian Material Culture (2010)</li>
            <li>PreserVenice: Venetian Public Art (2007)</li>
            <li>PreserVenice: Preserving Venetian Public Art (2009)</li>
            <li>Preserving Venetian Heritage (2008)</li>
            <li>Preserving Venetian Wellheads (2000)</li>
            <li>Public Art Preservation in Venice: Non-public Wellheads and Fountains (2004)</li>
            <li>
              The Forgotten Art of Venice: Promoting the Conservation and Awareness of External
              Sculpture (2000)
            </li>
            <li>
              The Interrelations of Weather, Pollution, and Acid Precipitation in Venice and their
              Effects on Indoor and Outdoor Art (1991)
            </li>
            <li>Treasures Underfoot: Preserving Venice's Church Floor Artifacts (2012)</li>
          </ul>
        </Typography>
        <Typography variant="title" align="center">
          Acknowledgements
        </Typography>
        <Separator />
        <Typography paragraph>
          PreserVenice acknowledges the support of the following organizations.
          <ul>
            <li>
              <a href="http://www.unesco.org/new/en/venice/home/">UNESCO</a>
            </li>
            <li>
              <a href="http://www.wpi.edu/academics/GPP/Centers/venice695.html">
                WPI Venice Project Center
              </a>
            </li>
            <li>
              <a href="http://www.earthwatch.org/">Earthwatch Institute</a>
            </li>
          </ul>
        </Typography>
      </div>
    </Page>
  );
}

About.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(About);

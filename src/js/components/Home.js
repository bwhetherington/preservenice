import React from 'react';
import Page from './Page';
import Separator from './Separator';
import ArtifactCard from './ArtifactCard';
import withArtifactDialog from './withArtifactDialog';
import { Typography, Grid } from '@material-ui/core';
import { object, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createArtifact } from '../artifact';
import { asyncIterator } from 'lazy-iters';
import { querySample } from '../data';
import RestorationCard from './RestorationCard';

function styles(theme) {
  return {
    cards: {
      padding: theme.spacing.unit * 3,
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      height: '100%'
    },
    card: {
      padding: theme.spacing.unit
    },
    scroll: {
      maxWidth: '100%',
      maxHeight: '100%'
    },
    logoContainer: {
      width: '100%',
      textAlign: 'center'
    },
    logo: {
      maxWidth: 500,
      margin: 'auto'
    },
    banner: {
      margin: 0,
      background: 'url(/static/images/pano_small.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: '-300px 0px',
      padding: '80px'
    },
    bannerText: {
      color: 'white',
      textShadow: '0px 0px 4px rgba(0, 0, 0, 0.85)',
      textAlign: 'center',
      userSelect: 'none'
    },
    bannerTextTitle: {
      fontSize: 70,
      fontFamily: theme.typography.title.fontFamily
    },
    bannerTextSubtitle: {
      fontSize: 20,
      fontFamily: theme.typography.title.fontFamily
    }
  };
}

const fakeRestorations = [
  {
    image: 'http://preservenice.org/images/restorations/cn248.png',
    description: (
      <Typography>
        Stemma CN248 was restored in 2000 with the help of PreserVenice and sixteen donors.
      </Typography>
    )
  },
  {
    image: 'http://preservenice.org/images/restorations/cn283.png',
    description: (
      <Typography>
        Relief CN283 was restored in 1999 with the help of PreserVenice and three donors.
      </Typography>
    )
  }
];

class Home extends React.Component {
  state = {
    artifactSample: []
  };

  componentDidMount() {
    this.loadArtifactSample();
  }

  async loadArtifactSample() {
    const sampleQuery = asyncIterator(querySample());
    const artifactSample = await sampleQuery
      .take(3)
      .map(createArtifact)
      .collect();

    this.setState({
      ...this.state,
      artifactSample
    });
  }

  render() {
    const { classes, onArtifactClick } = this.props;
    const { artifactSample } = this.state;
    return (
      <Page
        selected="home"
        banner={
          <div className={classes.banner}>
            <span className={classes.bannerText}>
              <div className={classes.bannerTextTitle}>PreserVenice</div>
              <div className={classes.bannerTextSubtitle}>
                A Crowdfunding Solution to Preserving Venetian Heritage
              </div>
            </span>
          </div>
        }
      >
        {/* <img className={classes.scroll} src="/static/pv_scroll_25px_height.png" /> */}
        <Separator />
        <Typography paragraph>
          PreserVenice is a non-profit organization devoted to the preservation and restoration of
          public art in Venice, Italy. Please help us preserve this precious collection of heritage
          by using our website to collect up-to-date information about the artifacts and to donate
          funds for their restoration.
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
        <Typography variant="headline" align="center">
          Artifacts in Need
        </Typography>
        <Separator />
        <Grid container spacing={16} className={classes.cards}>
          {artifactSample.map(artifact => (
            <Grid item key={artifact.name} xs={4}>
              <ArtifactCard
                artifact={artifact}
                className={classes.card}
                onClick={onArtifactClick(artifact)}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="headline" align="center">
          Completed Restorations
        </Typography>
        <Separator />
        <Grid container spacing={16} className={classes.cards}>
          {fakeRestorations.map(restoration => (
            <Grid item key={restoration.image} xs={16}>
              <RestorationCard restoration={restoration} />
            </Grid>
          ))}
        </Grid>
      </Page>
    );
  }
}

Home.propTypes = {
  classes: object.isRequired,
  onArtifactClick: func.isRequired
};

export default withArtifactDialog(withStyles(styles)(Home));

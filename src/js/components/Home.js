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
      background: 'url(/static/pano_2.jpg)',
      backgroundSize: 'cover',
      padding: '120px'
    },
    bannerText: {
      color: 'white',
      textShadow: '0px 0px 2px rgba(0, 0, 0, 0.75)',
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
        <Typography>
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
        <Typography paragraph>These artifacts are nearly at their funding goals.</Typography>
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
      </Page>
    );
  }
}

Home.propTypes = {
  classes: object.isRequired,
  onArtifactClick: func.isRequired
};

export default withArtifactDialog(withStyles(styles)(Home));

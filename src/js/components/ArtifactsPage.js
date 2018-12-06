import React from 'react';
import Map from './Map';
import Page from './Page';
import withArtifactDialog from './withArtifactDialog';
import { withStyles } from '@material-ui/core/styles';
import { object, string, func } from 'prop-types';
import {
  Divider,
  Drawer,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import { createMap, artifactTypes, FilterType, takeOrElse } from '../util';
import { queryGroupsAsync, filterGroups, queryAll } from '../data';
import { createArtifact, filterArtifacts, hasValidCoords } from '../artifact';
import { asyncIterator, iterator } from 'lazy-iters';
import FilterDrawer from './FilterDrawer';

function styles(theme) {
  return {
    mapControls: {
      padding: theme.spacing.unit
    },
    mapControlButton: {
      marginRight: theme.spacing.unit
    },
    filter: {
      width: '100%',
      height: '100%'
    },
    filterTitle: {
      padding: theme.spacing.unit,
      marginTop: theme.spacing.unit * 7
      // background: theme.palette.background.paper
    },
    filterButton: {
      width: '100%'
    },
    filterOptions: {
      overflowY: 'scroll'
      // background: theme.palette.background.default
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    content: {
      marginLeft: drawerWidth,
      height: '100%',
      overflowY: 'hidden'
    }
  };
}

const drawerWidth = 240;

function id(x) {
  return x;
}

class ArtifactPage extends React.Component {
  state = {
    artifacts: [],
    shownArtifacts: [],
    filters: takeOrElse(JSON.parse(window.sessionStorage.getItem('filters')), [])
  };

  componentDidMount() {
    const artifacts = JSON.parse(window.sessionStorage.getItem('artifacts'));
    if (artifacts !== null) {
      this.setState(
        {
          ...this.state,
          artifacts
        },
        () => this.setFilters(this.state.filters)
      );
    } else {
      this.loadArtifacts();
    }
  }

  async loadArtifacts() {
    const query = asyncIterator(queryAll());
    const artifacts = await query
      .map(createArtifact)
      .filter(hasValidCoords)
      .collect();
    window.sessionStorage.setItem('artifacts', JSON.stringify(artifacts));
    this.setState(
      {
        ...this.state,
        artifacts
      },
      () => this.setFilters(this.state.filters)
    );
  }

  /**
   * Shows the filter drawer.
   */
  showDrawer = () => {
    this.setState({
      ...this.state,
      showFilters: true
    });
  };

  /**
   * Hides the filter drawer.
   */
  hideDrawer = () => {
    this.setState({
      ...this.state,
      showFilters: false
    });
  };

  setFilters = filters => {
    window.sessionStorage.setItem('filters', JSON.stringify(filters));
    const shownArtifacts = filterArtifacts(this.state.artifacts, filters);
    this.setState({
      ...this.state,
      filters,
      shownArtifacts
    });
  };

  /**
   * Renders the component.
   */
  render() {
    const { classes, onArtifactClick } = this.props;
    const { filters } = this.state;

    const drawer = <FilterDrawer filters={filters} onChange={this.setFilters} />;

    return (
      <Page selected="map" fullScreen={true}>
        {drawer}
        <div className={classes.content}>
          <Map onArtifactClick={onArtifactClick} artifacts={this.state.shownArtifacts} />
        </div>
      </Page>
    );
  }
}

ArtifactPage.propTypes = {
  classes: object.isRequired,
  selected: string,
  onArtifactClick: func.isRequired
};

export default withArtifactDialog(withStyles(styles)(ArtifactPage));

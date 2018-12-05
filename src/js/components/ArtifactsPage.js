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
import { createMap, artifactTypes, FilterType } from '../util';
import { queryGroupsAsync, filterGroups, queryAll } from '../data';
import { createArtifact, filterArtifacts } from '../artifact';
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
      background: 'black',
      overflowY: 'hidden'
    }
  };
}

const drawerWidth = 240;

function id(x) {
  return x;
}

function hasValidCoords(artifact) {
  const { lat, lng } = artifact.position;
  return !(lat === null || lat === undefined || lng === null || lng === undefined);
}

class ArtifactPage extends React.Component {
  state = {
    filter: createMap(artifactTypes, _ => false),
    showFilters: false,
    artifacts: [],
    shownArtifacts: [],
    filters: []
  };

  async componentDidMount() {
    const query = asyncIterator(queryAll());
    const artifacts = await query
      .map(createArtifact)
      .filter(hasValidCoords)
      .collect();
    this.setState({
      ...this.state,
      artifacts
    });
    this.setFilters(this.state.filters);
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

  /**
   * Produces a handler to toggle the specified artifact type on or off.
   * @param type the artifact type
   */
  toggleType(type) {
    return () => {
      const { filter } = this.state;
      const newFilter = {
        ...filter,
        [type]: !filter[type]
      };
      this.queryArtifacts(newFilter);
    };
  }

  /**
   * Produces a list containing the artifact types that have been selected to be filtered.
   */
  filteredTypes(filter) {
    return Object.keys(filter).filter(key => filter[key]);
  }

  async queryArtifacts(filter) {
    let query;
    if (iterator(Object.values(filter)).all(id)) {
      query = queryAll();
    } else {
      const list = this.filteredTypes(filter);
      const groups = filterGroups(list);
      query = queryGroupsAsync(groups);
    }
    const artifacts = await asyncIterator(query)
      .map(createArtifact)
      .filter(hasValidCoords)
      .collect();
    this.setState({
      ...this.state,
      filter,
      artifacts
    });
  }

  setFilters = filters => {
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

    const drawer = <FilterDrawer onChange={this.setFilters} />;

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

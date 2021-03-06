import React from 'react';
import Page from './Page';
import { object, func, bool } from 'prop-types';
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  Typography,
  MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  types,
  sestieri,
  createArtifact,
  containsKeyword,
  filterArtifact,
  hasValidCoords
} from '../artifact';
import { asyncIterator, iterator } from 'lazy-iters';
import withArtifactDialog from './withArtifactDialog';
import { queryAll } from '../data';

import FilterDrawer from './FilterDrawer';
import { takeOrElse } from '../util';

const drawerWidth = 240;

function styles(theme) {
  return {
    controls: {
      padding: theme.spacing.unit
    },
    table: {
      tableLayout: 'fixed'
    },
    pagination: {
      float: 'right'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      width: 160
    },
    numberField: {
      marginLeft: theme.spacing.unit,
      width: 100
    },
    loading: {
      width: '100%',
      padding: 100
    },
    clearButton: {
      float: 'right'
    },
    tableRow: {
      height: theme.spacing.unit * 4.5
    },
    tableCell: {
      height: 'auto !important'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    root: {
      marginLeft: drawerWidth,
      height: '100%',
      overflowY: 'scroll',
      padding: theme.spacing.unit * 3
    },
    content: {
      // padding: theme.spacing.unit * 3
      // overflowY: 'scroll'
    }
  };
}

const rowsPerPage = 10;

const defaultFilter = {
  name: '',
  keyword: '',
  type: 'Any',
  sestiere: 'Any',
  height: '',
  tolerance: 0
};

function Load(props) {
  const { loaded = true, children } = props;
  const newChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      disabled: !loaded
    })
  );
  return <React.Fragment>{newChildren}</React.Fragment>;
}

Load.propTypes = {
  loaded: bool
};

const filterOptions = {
  hideAllIfNoFilters: false
};

class Search extends React.Component {
  state = {
    data: [],
    loaded: false,
    page: 0,
    rowsPerPage,
    filters: takeOrElse(JSON.parse(window.sessionStorage.getItem('filters')), [])
  };

  async componentDidMount() {
    const cachedArtifacts = JSON.parse(window.sessionStorage.getItem('artifacts'));
    if (cachedArtifacts) {
      console.log('loading cached artifact data');
      this.setState({
        ...this.state,
        data: cachedArtifacts,
        loaded: true
      });
    } else {
      console.log('querying data.preservenice.org');
      const iter = asyncIterator(queryAll());
      const data = await iter
        .map(createArtifact)
        .filter(hasValidCoords)
        .collect();
      window.sessionStorage.setItem('artifacts', JSON.stringify(data));
      this.setState({
        ...this.state,
        loaded: true,
        data
      });
    }
  }

  handleChangePage = (_, page) => {
    this.setState({
      ...this.state,
      page
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      ...this.state,
      rowsPerPage: event.target.value
    });
  };

  filterArtifacts() {
    const { data, filters } = this.state;
    return iterator(data).filter(artifact => filterArtifact(artifact, filters, filterOptions));
  }

  setFilters = filters => {
    window.sessionStorage.setItem('filters', JSON.stringify(filters));
    this.setState({
      ...this.state,
      filters
    });
  };

  render() {
    const { classes, onArtifactClick } = this.props;
    const { page, rowsPerPage, loaded, filters } = this.state;
    const filteredArtifacts = this.filterArtifacts().collect();
    const renderedArtifacts = iterator(filteredArtifacts)
      .skip(page * rowsPerPage)
      .take(rowsPerPage)
      .map(artifact => {
        const { id, name, type, sestiere, year } = artifact;
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={id}
            onClick={onArtifactClick(artifact)}
            className={classes.tableRow}
          >
            <TableCell className={classes.tableCell}>{name}</TableCell>
            <TableCell className={classes.tableCell}>{type}</TableCell>
            <TableCell className={classes.tableCell}>{sestiere}</TableCell>
            <TableCell className={classes.tableCell}>{year}</TableCell>
          </TableRow>
        );
      })
      .collect();

    const drawer = <FilterDrawer onChange={this.setFilters} filters={filters} />;

    return (
      <Page fullScreen={true} selected="artifacts">
        {drawer}
        <div className={classes.root}>
          <Paper className={classes.content}>
            <Table className={classes.table} padding="dense">
              <TableHead>
                <TableRow>
                  <TableCell width="40%">Artifact</TableCell>
                  <TableCell width="20%">Type</TableCell>
                  <TableCell width="20%">Sestiere</TableCell>
                  <TableCell width="20%">Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {loaded ? (
                  renderedArtifacts
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography align="center" variant="button" className={classes.loading}>
                        Loading
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredArtifacts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              className={classes.pagination}
            />
          </Paper>
        </div>
      </Page>
    );
  }
}

Search.propTypes = {
  classes: object.isRequired,
  onArtifactClick: func.isRequired
};

export default withStyles(styles)(withArtifactDialog(Search));

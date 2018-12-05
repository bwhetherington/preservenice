import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  withMobileDialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { types, sestieri, createArtifact, containsKeyword } from '../artifact';
import { queryAll } from '../data';

const defaultFilter = {
  name: '',
  keyword: '',
  type: 'Any',
  sestiere: 'Any',
  height: '',
  tolerance: 0
};

function dialogStyles(_) {
  return {
    description: {
      // minWidth: '600px'
    },
    close: {
      float: 'right'
    }
  };
}

function parseInputNumber(input) {
  return input.length > 0 ? Number.parseFloat(input) : input;
}

function ArtifactSearchDialog(props) {
  const { fullScreen, search, onChangeOption, open, classes } = props;
  const { name, keyword, type, sestiere, height } = search;
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>
        Artifact Search
        <span className={classes.close}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </span>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          onChange={onChangeOption('name')}
          value={name}
          className={classes.textField}
          label="Name"
        />
        <TextField
          margin="dense"
          onChange={onChangeOption('keyword')}
          value={keyword}
          className={classes.textField}
          label="Keyword"
        />
        <TextField
          margin="dense"
          select
          label="Type"
          value={type}
          onChange={onChangeOption('type')}
          className={classes.textField}
          placeholder="Type"
        >
          <MenuItem key="Any" value="Any">
            Any
          </MenuItem>
          {types.map(group => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          select
          label="Sestiere"
          value={sestiere}
          onChange={onChangeOption('sestiere')}
          className={classes.textField}
          placeholder="Type"
        >
          <MenuItem key="Any" value="Any">
            Any
          </MenuItem>
          {sestieri.map(group => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          onChange={onChangeOption('height', parseInputNumber)}
          value={height}
          type="number"
          className={classes.numberField}
          label="Height (cm)"
        />
        {/* <TextField
            margin="dense"
            // disabled={!loaded}
            onChange={this.handleChangeSearchTolerance}
            value={this.state.search.tolerance}
            type="number"
            className={classes.numberField}
            label="Tolerance (cm)"
          /> */}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onReset}>
          Reset
        </Button>
        <Button color="primary" onClick={onSearch}>
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const ArtifactSearch = withMobileDialog()(withStyles(dialogStyles)(ArtifactSearchDialog));

function id(x) {
  return x;
}

class ArtifactDialogWrapper extends React.Component {
  state = {
    showSearch: false,
    search: defaultFilter,
    data: []
  };

  async componentDidMount() {
    const data = await asyncIterator(queryAll()).collect();
    this.setState({
      ...this.state,
      data
    });
  }

  filter = () => {
    const { search, data } = this.state;
    const { name, keyword, type, sestiere, height } = search;
    const filterName = name.length == 0;
    const filterKeyword = keyword.length == 0;
    const filterType = type.length == 0 || type === 'Any';
    const filterSestiere = sestiere.length == 0 || sestiere === 'Any';
    const filterHeight = !(typeof height == 'number' && typeof tolerance == 'number');
    const searchName = name.toLowerCase();
    const searchKeyword = keyword.toLowerCase();
    const searchType = type.toLowerCase();
    const searchSestiere = sestiere.toLowerCase();
    return iterator(data)
      .filter(({ name }) => filterName || name.toLowerCase().indexOf(searchName) >= 0)
      .filter(artifact => filterKeyword || containsKeyword(artifact, searchKeyword))
      .filter(({ type }) => filterType || type.toLowerCase() === searchType)
      .filter(({ sestiere }) => filterSestiere || sestiere.toLowerCase() === searchSestiere)
      .filter(({ heightCM }) => filterHeight || Math.abs(heightCM - height) <= 1);
  };

  showSearch = () =>
    this.setState({
      ...this.state,
      showSearch: true
    });

  /**
   * Hides the currently displayed artifact.
   */
  hideSearch = () =>
    this.setState({
      ...this.state,
      showSearch: false
    });

  changeOptionString = (option, transformer = id) => event => {
    const { search } = this.state;
    const value = transformer(event.target.value);
    const newSearch = {
      ...search,
      [option]: value
    };
    this.setSearch(newSearch);
  };

  setSearch = search =>
    this.setState({
      ...this.state,
      search
    });

  reset = () => this.setSearch(defaultFilter);

  onSearch = fn => fn(this.filter());

  /**
   * Renders the artifact dialog if it is open, and the child component. All props are passed to
   * the child component.
   */
  render() {
    const { Component, componentProps } = this.props;
    const { showSearch } = this.state;

    const searchDialog = <ArtifactSearch open={showSearch} />;

    return (
      <React.Fragment>
        {artifactDialog}
        <Component
          openArtifactSearch={this.openArtifactFilter}
          artifactSearch={this.state.search}
          setArtifactSearch={this.setSearch}
          filterArtifacts={this.filter}
          {...componentProps}
        />
      </React.Fragment>
    );
  }
}

/**
 * Produces a new component that is equal to the specified component wrapped with a component that
 * displays an artifact dialog when the child's `onArtifactClick` handler is called.
 * @param component the component to wrap
 */
function withArtifactDialog(component) {
  return props => <ArtifactDialogWrapper Component={component} componentProps={props} />;
}

export default withArtifactDialog;

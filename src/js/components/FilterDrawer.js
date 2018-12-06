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
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  withMobileDialog,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { id, takeOrElse } from '../util';
import { sestieri, types, FilterType } from '../artifact';

const PropertyType = {
  CM: 0
};

const propertyOptions = {
  sestiere: sestieri,
  type: types,
  height: PropertyType.CM,
  fromGround: PropertyType.CM,
  year: PropertyType.AD
};

const propertyComparisons = {
  sestiere: [FilterType.EQ, FilterType.NEQ],
  type: [FilterType.EQ, FilterType.NEQ],
  height: Object.values(FilterType),
  fromGround: Object.values(FilterType),
  year: Object.values(FilterType)
};

const defaultFilterChipOptions = {
  type: FilterType.EQ,
  option: 'sestiere',
  matches: ''
};

function createFilterChipStyles(theme) {
  return {
    textField: {
      width: '140px'
    },
    modeField: {
      width: '60px',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      textAlign: 'center'
    },
    close: {
      marginLeft: theme.spacing.unit * 3,
      float: 'right'
    },
    controls: {
      margin: 'auto'
    }
  };
}

function parseInputNumber(input) {
  return input.length > 0 ? Number.parseFloat(input) : input;
}

class CreateFilterChipInner extends React.Component {
  state = defaultFilterChipOptions;

  onChangeOption(option, transformer = id) {
    const { onChange, filter } = this.props;
    return event =>
      onChange({
        ...filter,
        [option]: transformer(event.target.value)
      });
  }

  onChangeType = event => {
    const { onChange } = this.props;
    const { value } = event.target;
    if (value !== this.state.option) {
      this.setState(
        {
          ...this.state,
          option: value
        },
        () =>
          onChange({
            ...defaultFilterChipOptions,
            option: value
          })
      );
    }
  };

  onAdd = () => {
    const { onAdd = console.log, filter } = this.props;
    if (typeof filter.matches === 'number' || filter.matches.length > 0) {
      onAdd(filter);
    }
  };

  render() {
    const { fullScreen = false, classes, onClose, onChange, open, filter } = this.props;
    const { textField, modeField, close, controls } = classes;
    const { type, option, matches } = filter;

    const optionOptions = Object.keys(propertyComparisons);
    const typeOptions = propertyComparisons[option];
    const matchesOptions = propertyOptions[option];

    const valueField =
      matchesOptions === PropertyType.CM ? (
        <TextField
          type="number"
          className={textField}
          label="Value"
          value={matches}
          onChange={this.onChangeOption('matches', parseInputNumber)}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>
          }}
        />
      ) : matchesOptions === PropertyType.AD ? (
        <TextField
          type="number"
          className={textField}
          label="Value"
          value={matches}
          onChange={this.onChangeOption('matches', parseInputNumber)}
          InputProps={{
            endAdornment: <InputAdornment position="end">A.D.</InputAdornment>
          }}
        />
      ) : (
        <TextField
          select
          className={textField}
          label="Value"
          value={matches}
          onChange={this.onChangeOption('matches')}
        >
          {matchesOptions.map(key => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </TextField>
      );

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
        <DialogTitle>
          Add Filter
          <span className={close}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </span>
        </DialogTitle>
        <DialogContent>
          <div className={controls}>
            <TextField
              select
              className={textField}
              label="Property"
              value={option}
              onChange={this.onChangeType}
            >
              {optionOptions.map(key => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              className={modeField}
              label="Mode"
              value={type}
              onChange={this.onChangeOption('type')}
            >
              {typeOptions.map(key => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
            {valueField}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const CreateFilterChip = withMobileDialog()(
  withStyles(createFilterChipStyles)(CreateFilterChipInner)
);

function editFilter(filter, onEdit) {
  return () => onEdit(filter);
}

function filterChipStyles(theme) {
  return {
    chip: {
      marginBottom: 0,
      margin: theme.spacing.unit,
      flex: '1'
    },
    closeButton: {
      float: 'right',
      fontSizeSmall: 0
    },
    fillRest: {
      minWidth: '100%'
    }
  };
}

function FilterChipInner(props) {
  const { option, type, matches, onEdit, classes, onDelete } = props;
  const label = (
    <span className={classes.label}>
      {option} {type} {matches}
      <span className={classes.fillRest} />
    </span>
  );
  return (
    <Chip className={classes.chip} clickable onClick={onEdit} label={label} onDelete={onDelete} />
  );
}

const FilterChip = withStyles(filterChipStyles)(FilterChipInner);

const drawerWidth = 240;

function styles(theme) {
  return {
    filterTitle: {
      padding: theme.spacing.unit,
      marginTop: theme.spacing.unit * 7,
      width: '240px'
      // background: theme.palette.background.paper
    },
    drawer: {
      width: drawerWidth,
      maxWidth: drawerWidth,
      flexShrink: 0
    },
    drawerButton: {
      width: '100%'
    },
    filterOptions: {
      width: '100%',
      marginBottom: theme.spacing.unit
    },
    row: {
      display: 'flex',
      flexDirection: 'row'
    }
  };
}

class FilterDrawer extends React.Component {
  state = {
    open: false,
    dialogOpen: false,
    dialogFilter: defaultFilterChipOptions,
    filters: this.props.filters
  };

  hide = () =>
    this.setState({
      ...this.state,
      open: false
    });

  openDialog(dialogFilter = defaultFilterChipOptions) {
    return () =>
      this.setState({
        ...this.state,
        dialogOpen: true,
        dialogFilter
      });
  }

  editDialog(dialogFilter) {
    return () =>
      this.setState({
        ...this.state,
        dialogOpen: true,
        dialogFilter,
        filters: this.state.filters.filter(filter => filter !== dialogFilter)
      });
  }

  closeDialog = () =>
    this.setState({
      dialogOpen: false
    });

  changeFilterOption(option, transformer) {
    return event =>
      this.setState({
        ...this.state,
        filter: {
          ...this.state.filter,
          [option]: transformer(event.target.value)
        }
      });
  }

  onChangeDialogFilter = dialogFilter =>
    this.setState({
      ...this.state,
      dialogFilter
    });

  onAddFilter = filter => {
    const filters = this.state.filters.concat(filter);
    this.setState({
      ...this.state,
      dialogOpen: false,
      filters
    });
    this.props.onChange(filters);
  };

  clearFilters = () => {
    const filters = [];
    this.setState({
      ...this.state,
      filters
    });
    this.props.onChange(filters);
  };

  removeFilter(filter) {
    return () => {
      const filters = this.state.filters.filter(f => f !== filter);
      this.setState({
        ...this.state,
        filters
      });
      this.props.onChange(filters);
    };
  }

  render() {
    const { dialogOpen, dialogFilter, filters } = this.state;
    const { classes, onChange } = this.props;
    const dialog = (
      <CreateFilterChip
        open={dialogOpen}
        filter={dialogFilter}
        onChange={this.onChangeDialogFilter}
        onAdd={this.onAddFilter}
        onClose={this.closeDialog}
      />
    );
    return (
      <React.Fragment>
        {dialog}
        <Drawer variant="permanent" open={true} onClose={this.hide} className={classes.drawer}>
          <div className={classes.filterTitle}>
            <Typography paragraph variant="title" align="center">
              Artifact Filters
            </Typography>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <Button size="small" onClick={this.openDialog()} className={classes.drawerButton}>
                  Add
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button size="small" onClick={this.clearFilters} className={classes.drawerButton}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div className={classes.filterOptions}>
            {filters.map((filter, index) => (
              <div key={index}>
                <FilterChip
                  {...filter}
                  onEdit={this.editDialog(filter)}
                  onDelete={this.removeFilter(filter)}
                />
              </div>
            ))}
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FilterDrawer);

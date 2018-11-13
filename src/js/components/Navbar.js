import React from 'react';
import NavButton from './NavButton';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';

function styles(theme) {
  return {
    appBar: {
      // position: 'relative',
      zIndex: theme.zIndex.drawer + 1
      // background: '#c33764' /* fallback for old browsers */,
      // background:
      //   '-webkit-linear-gradient(to right, #c33764, #1d2671)' /* Chrome 10-25, Safari 5.1-6 */,
      // background:
      //   'linear-gradient(to right, #c33764, #1d2671)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      // background: 'linear-gradient(45deg, #C33764 50%, #FF8E53 90%)'
      // flex: '0'
    },
    toolbarTitle: {
      flex: '1',
      textAlign: 'left'
    },
    controls: {
      float: 'right'
    },
    icon: {
      height: 28,
      margin: theme.spacing.unit
    },
    login: {
      marginLeft: theme.spacing.unit,
      borderColor: 'white'
    }
  };
}

/**
 * Creates a click handler that navigates to the specified URL.
 * @param {string} href The specified URL
 */
function onClick(href) {
  return () => {
    location.href = href;
  };
}

const links = {
  home: {
    name: 'Home',
    handler: onClick('/home')
  },
  map: {
    name: 'Map',
    handler: onClick('/map')
  },
  artifacts: {
    name: 'Artifacts',
    handler: onClick('/artifacts')
  },
  about: {
    name: 'About',
    handler: onClick('/about')
  },
  contact: {
    name: 'Contact',
    handler: onClick('/contact')
  }
};

/**
 * Renders the links specified in the links object as `NavButton`s.
 * @param {string} selected The currently selected page
 * @param {object} links An object mapping urls to page names
 */
function renderLinks(selected, links) {
  return Object.keys(links).map(key => (
    <NavButton key={key} selected={key === selected} onClick={links[key].handler}>
      {links[key].name}
    </NavButton>
  ));
}

function Navbar(props) {
  const { classes, selected, position = 'sticky' } = props;
  return (
    <AppBar position={position} className={classes.appBar}>
      <Toolbar variant="dense">
        {/* <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
          PreserVenice
        </Typography> */}
        <span className={classes.toolbarTitle}>
          <img src="/static/pv logo white.svg" className={classes.icon} />
        </span>
        <span className={classes.controls}>
          {renderLinks(selected, links)}
          <Button color="inherit" variant="outlined" className={classes.login}>
            Login
          </Button>
        </span>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Navbar);

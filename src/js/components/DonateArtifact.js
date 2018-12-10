import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  LinearProgress,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  MenuItem,
  InputAdornment
} from '@material-ui/core';

import { queryItem } from '../data';
import { createArtifact } from '../artifact';

import { id } from '../util';
import Separator from './Separator';

function styles(theme) {
  return {};
}

function artifactAreaStyles(theme) {
  return {
    content: {
      margin: 'auto',
      width: '600px'
    },
    progress: {
      maxWidth: '400px',
      marginBottom: theme.spacing.unit,
      margin: 'auto'
    },
    media: {
      objectFit: 'cover',
      width: '100%',
      paddingBottom: theme.spacing.unit
    }
  };
}

function ArtifactAreaInner(props) {
  const { classes, artifact } = props;

  return (
    <div className={classes.content}>
      <Typography variant="h6" align="center">
        {artifact.name}
      </Typography>
      <Separator />
      <img className={classes.media} src={artifact.coverImage} />
      <Typography paragraph align="center">
        {artifact.description}
      </Typography>
      <LinearProgress
        className={classes.progress}
        variant="determinate"
        value={(artifact.amountDonated / artifact.amountNeeded) * 100}
      />
      <Typography variant="caption" align="center">
        €{artifact.amountDonated} / €{artifact.amountNeeded}
      </Typography>
    </div>
  );
}

const ArtifactArea = withStyles(artifactAreaStyles)(ArtifactAreaInner);

function donateAreaStyles(theme) {
  return {
    content: {
      marginTop: theme.spacing.unit * 3,
      padding: theme.spacing.unit
    },
    line: {
      display: 'flex',
      flexDirection: 'row'
    },
    label: {
      flexGrow: '0'
    },
    textFieldContainer: {
      flexGrow: '1',
      padding: theme.spacing.unit
    },
    textField: {
      width: '100%'
    },
    actions: {
      float: 'right'
    }
  };
}

function parseNumber(input) {
  return input.length > 0 ? parseFloat(input) : '';
}

function trimLeadingSpaces(s) {
  return s.replace(/^ +/gm, '');
}

function trimNewLines(s) {
  return s.replace(/\n/gm, ' ');
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const defaultState = {
  name: '',
  email: '',
  taxId: ''
};

class DonateAreaInner extends React.Component {
  state = defaultState;

  onChange(prop, transformer = id) {
    return event => {
      const { value } = event.target;
      const newValue = transformer(value);
      this.setState({
        ...this.state,
        [prop]: newValue
      });
    };
  }

  reset = () => {
    this.setState(defaultState);
  };

  warn = () => {
    const body = trimNewLines(
      trimLeadingSpaces(`
      As of writing this code, the Swarmoola API did not exist. We hope for
      your sakes that it does when you get to this, because Fabio wants this to
      hook into it.
    `)
    );
    console.log(
      trimLeadingSpaces(`
      Dear future PreserVenice team,

      ${body}

      Sincerely,
      A past PreserVenice team
    `)
    );
  };

  render() {
    const { classes } = this.props;
    const { amount, cardNumber, code, expMonth, expYear } = this.state;

    return (
      <Card className={classes.content}>
        <CardHeader
          title="Tax Information"
          titleTypographyProps={{ variant: 'h6', align: 'center' }}
          subheader="Please enter the following information in order to generate a tax receipt for your donation."
          subheaderTypographyProps={{ variant: 'subtitle1', align: 'center' }}
        />
        <CardContent>
          <div className={classes.line}>
            <span className={classes.textFieldContainer}>
              <TextField
                className={classes.textField}
                onChange={this.onChange('name', parseNumber)}
                value={amount}
                label="Name"
              />
            </span>
          </div>
          <div className={classes.line}>
            <span className={classes.textFieldContainer}>
              <TextField
                className={classes.textField}
                onChange={this.onChange('email', parseNumber)}
                value={amount}
                label="Email Address"
              />
            </span>
          </div>
          <div className={classes.line}>
            <span className={classes.textFieldContainer}>
              <TextField
                className={classes.textField}
                onChange={this.onChange('taxId', parseNumber)}
                value={amount}
                label="Tax ID"
              />
            </span>
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={this.reset}>Reset</Button>
          <Button onClick={this.warn} variant="outlined">
            Donate
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const DonateArea = withStyles(donateAreaStyles)(DonateAreaInner);

class Donate extends React.Component {
  state = {
    artifact: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== null && id !== undefined) {
      const item = await queryItem(id);
      this.setState({
        ...this.state,
        artifact: createArtifact(item)
      });
    }
  }

  render() {
    const { classes, match } = this.props;
    const { artifact } = this.state;

    let content = <div />;

    if (artifact !== null && artifact !== undefined) {
      content = (
        <div>
          <ArtifactArea artifact={artifact} />
          <DonateArea />
        </div>
      );
    }

    return <Page selected="donate">{content}</Page>;
  }
}

export default withStyles(styles)(Donate);

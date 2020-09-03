import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Button from '@material-ui/core/Button';

const pinkTheme = createMuiTheme({ palette: { primary: pink } })
const greenTheme = createMuiTheme({ palette: { primary: green } })

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <MuiThemeProvider theme={pinkTheme}>
            <Button variant="contained" color="primary">
                Sign-Up
            </Button>
        </MuiThemeProvider>

        <MuiThemeProvider theme={greenTheme}>
            <Button variant="contained" color="primary">
                Login
            </Button>
        </MuiThemeProvider>
    </div>
  );
}
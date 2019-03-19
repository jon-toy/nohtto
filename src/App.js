import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { deepPurple, pink } from '@material-ui/core/colors';
import AppBar from './components/AppBar';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import { getNotes } from './redux/actionCreators';
import Note from './components/Note';
import AddNewButton from './components/AddNewButton';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: pink
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 25
  },
});

class App extends Component {

  state = {
    spacing: 40,
    justify: "flex-start"
  }


  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <header className="App-header">
            <AppBar/>
          </header>
          <main>
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify={this.state.justify} spacing={Number(spacing)}>
                      {this.props.notes.map((note) => {
                        return (
                          <Grow key={note._id} in={true} style={{ transitionDelay: 100 }}>
                            <Grid key={note._id} item>
                                <Note note={note}/>     
                            </Grid>
                          </Grow>
                        )
                      })}
                    </Grid>
                </Grid>
            </Grid>    
          </main>
          <AddNewButton/>
        </MuiThemeProvider>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNotes: () => dispatch(getNotes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

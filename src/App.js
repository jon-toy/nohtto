import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { deepPurple, pink } from '@material-ui/core/colors';
import AppBar from './components/AppBar';
import { getNotes } from './redux/actionCreators';
import PadsView from './components/PadsView';
import NotesView from './components/NotesView';
import CreateNote from './components/CreateNote';
import history from './router/history';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: pink
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = () => ({
  root: {
    flexGrow: 1,
    paddingTop: 25
  },
});

class App extends Component {

  state = {
    spacing: 40,
    justify: "center"
  }


  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    return (
    <BrowserRouter history={history}>
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <header className="App-header">
            <AppBar/>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={PadsView} />
              <Route path="/pads/:pad/new/:noteType" component={CreateNote} />
              <Route path="/pads/:pad" component={NotesView} />
            </Switch>
          </main>
        </MuiThemeProvider>
      </div>
    </BrowserRouter>
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

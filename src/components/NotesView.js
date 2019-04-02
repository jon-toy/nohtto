import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotes } from '../redux/actionCreators';
import CreateNewNoteButton from './CreateNewNoteButton';
import Note from './Note';


const styles = () => ({
  root: {
    flexGrow: 1,
    paddingTop: 25
  },
});

class NotesView extends Component {

  state = {
    spacing: 40,
    justify: "center"
  }


  componentDidMount() {
    this.props.getNotes(this.props.match.params.pad);
  }

  render() {
    
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
        <div>
          <main>
            <Grid container className={classes.root} spacing={16}>
              <Typography variant="h2" gutterBottom>
                {this.props.padTitle}
              </Typography>
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
          <CreateNewNoteButton pad={this.props.match.params.pad}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotesView));

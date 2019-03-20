import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { Link } from 'react-router-dom'

import { getPads } from '../redux/actionCreators';
import Pad from './Pad';
import AddNewButton from './AddNewButton';

const styles = () => ({
  root: {
    flexGrow: 1,
    paddingTop: 25
  },
});

class PadView extends Component {

  state = {
    spacing: 40,
    justify: "center"
  }


  componentDidMount() {
    this.props.getPads();
  }

  render() {
    
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
        <div>
          <main>
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify={this.state.justify} spacing={Number(spacing)}>
                      {this.props.pads.map((pad) => {
                        return (
                          <Grow key={pad._id} in={true} style={{ transitionDelay: 100 }}>
                            <Grid key={pad._id} item>
                                <Link to={`/pads/${pad._id}`}>
                                    <Pad pad={pad}/>  
                                </Link>
                            </Grid>
                          </Grow>
                        )
                      })}
                    </Grid>
                </Grid>
            </Grid>    
          </main>
          <AddNewButton/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pads: state.pads
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPads: () => dispatch(getPads())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PadView));

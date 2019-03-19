import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Redirect } from 'react-router-dom';
import LogoYoutube from 'react-ionicons/lib/LogoYoutube'
import LogoTwitch from 'react-ionicons/lib/LogoTwitch'
import LogoTwitter from 'react-ionicons/lib/LogoTwitter'
import MdImage from 'react-ionicons/lib/MdImage'
import IosPaperOutline from 'react-ionicons/lib/IosPaperOutline'

const styles = theme => ({
  root: {
    height: 380,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const actions = [ 
  { icon: <IosPaperOutline/>, name: 'Text', url: '/new/text'},
  { icon: <MdImage/>, name: 'Image', url: '/new/image'},
  { icon: <LogoTwitter/>, name: 'Tweet', url: '/new/twitter'},
  { icon: <LogoTwitch/>, name: 'Twitch', url: '/new/twitch'},
  { icon: <LogoYoutube/>, name: 'YouTube', url: '/new/youtube'},
];

class AddNewButton extends React.Component {
  state = {
    open: false,
    hidden: false,
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden,
    }));
  };

  handleClick = (action) => {
      if ( action ) {
        this.setState(state => ({
          open: !state.open,
          redirect: true,
          url: action.url
        }));
      }
      else {
        this.setState(state => ({
          open: !state.open
        }));
      }
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    let isTouch;
    if (typeof document !== 'undefined') {
      isTouch = 'ontouchstart' in document.documentElement;
    }

    if (this.state.redirect === true ) {
      let url = this.state.url;
      return <Redirect to={url} />
    }

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="Create a new Note!"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={() => this.handleClick(null)}
          onClose={this.handleClose}
          onFocus={isTouch ? undefined : this.handleOpen}
          onMouseEnter={isTouch ? undefined : this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => this.handleClick(action)}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

export default withStyles(styles)(AddNewButton);
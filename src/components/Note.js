import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import NoteContent from './NoteContent';
import { deleteNote } from '../redux/actionCreators';

const styles = () => ({
  card: {
    width: 350,
  },
  actions: {
    display: 'flex',
  },
});

function Note(props) {
  const { classes, note, padId } = props;
  const tags = note.tags.length <= 0 ? '' : 'Tags: ' + note.tags.map((tag) => tag.description).join(', ');

  return (
    <Card className={classes.card}>
      <CardHeader
        title={note.meta.title}
        subheader={tags}
      />
      <CardContent>
        <Typography component="p">
          {note.content.contentBody.text}
        </Typography>
      </CardContent>
      <CardContent>
        <NoteContent note={note}/>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => props.deleteNote(note._id, padId)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      {note.content.tags && note.content.tags.length > 0 && 
        <CardContent>
          <Typography component="span">
            {note.content.tags}
          </Typography>
        </CardContent>
      }
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    currentPad: state.currentPad
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteNote: (noteId, padId) => dispatch(deleteNote(noteId, padId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Note));
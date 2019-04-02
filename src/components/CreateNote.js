import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input';
import { connect } from 'react-redux';
import { NOTE_TYPE_IMAGE, NOTE_TYPE_TWITCH, NOTE_TYPE_TWITTER, NOTE_TYPE_YOUTUBE, NOTE_TYPE_TEXT } from '../constants';
import { createNote } from '../redux/actionCreators';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: 25,
        paddingLeft: 50,
      },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class CreateNote extends React.Component {
    state = {
        title: '',
        text: '',
        extra: '',
        tags: []
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const {pad} = this.props.match.params;
        const {noteType} = this.props.match.params;

        var newNote = {};
        newNote.meta = {};
        newNote.meta.title = this.state.title;

        newNote.content = {};
        newNote.content.contentType = noteType;
        newNote.content.contentBody = {};
        newNote.content.contentBody.text = this.state.text;

        switch (noteType) {
            case NOTE_TYPE_YOUTUBE:
                newNote.content.contentBody.videoId = this.getYoutubeId(this.state.extra);
                break;
            case NOTE_TYPE_TWITCH:
                newNote.content.contentBody.twitchId = this.getTwitchId(this.state.extra);
                break;
            case NOTE_TYPE_TWITTER:
                newNote.content.contentBody.tweetId = this.state.extra;
                break;
            case NOTE_TYPE_TEXT:
                newNote.content.contentBody.imageUrl = this.state.extra;
                break;
            default:
        }

        newNote.tags = this.state.tags.map((tag) => {
            return {description: tag}
        });

        console.log(newNote);

        this.props.createNote(newNote, pad, () => {
            // Go home, show snackbar
        });
    }

    /**
     * Taken from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
     * @param {*} url 
     */
    getYoutubeId(url) {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else {
            return null;
        }
    }

    getTwitchId(url) {
        var noParams = url.split('?')[0];
        return noParams.replace("https://clips.twitch.tv/", "");
    }

    handleAddChip(chip) {
        this.setState(state => ({
            tags: [...state.tags, chip]
        }))
    }

    handleDeleteChip(chip, index) {
        this.setState(state => ({
            tags: state.tags.filter((_, i) => i !== index)
        }))
    }

    render() {
        const {classes} = this.props;
        const {noteType} = this.props.match.params;

        let label = null;
        if (noteType === NOTE_TYPE_IMAGE) label = "Image URL";
        else if (noteType === NOTE_TYPE_TWITCH) label = "Twitch URL";
        else if (noteType === NOTE_TYPE_TWITTER) label = "Tweet URL";
        else if (noteType === NOTE_TYPE_YOUTUBE) label = "YouTube URL";

        return (
            <Paper>
                <Grid container className={classes.root} spacing={16}>
                    <Typography variant="h3" gutterBottom>
                        Create a Note
                    </Typography>
                    <Grid container className={classes.demo} spacing={24}>
                        <form className={classes.container} onSubmit={this.handleSubmit}>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    label="Note Title"
                                    className={classes.textField}
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="text"
                                    label="Note Text"
                                    className={classes.textField}
                                    value={this.state.text}
                                    onChange={this.handleChange('text')}
                                    margin="normal"
                                />
                            </Grid>
                            {label && 
                            <Grid item xs={12}>
                                <TextField
                                    id="text"
                                    label={label}
                                    className={classes.textField}
                                    value={this.state.extra}
                                    onChange={this.handleChange('extra')}
                                    margin="normal"
                                />
                            </Grid>}
                            <Grid item xs={12}>
                                <ChipInput
                                    label="Tags"
                                    className={classes.textField}
                                    value={this.state.tags}
                                    onAdd={(chip) => this.handleAddChip(chip)}
                                    onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                                    blurBehavior="add"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">
                                    Create Note
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
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
      createNote: (newNote, padId) => dispatch(createNote(newNote, padId))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateNote));
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ResponsiveEmbed from 'react-responsive-embed';
import {Tweet} from 'react-twitter-widgets';
import { 
    NOTE_TYPE_IMAGE,
    NOTE_TYPE_TEXT,
    NOTE_TYPE_TWITCH,
    NOTE_TYPE_TWITTER,
    NOTE_TYPE_YOUTUBE
} from '../constants';



const styles = () => ({
    image: {
        maxWidth: '100%',
        display: 'block',
        margin: 'auto',
    }
});

function NoteContent(props) {
    const { note } = props;
    const type = note.content.contentType;
    const contentBody = note.content.contentBody;
    if (type === NOTE_TYPE_IMAGE)
        return (
            <img alt={note.meta.title} src={contentBody.imageUrl} className={props.classes.image}/>
        );
    else if (type === NOTE_TYPE_TEXT)
        return (<span/>
            // <Typography paragraph>
            //     { note.content.contentBody.text }
            // </Typography>
        );
    else if (type === NOTE_TYPE_TWITCH)
        return (
            <ResponsiveEmbed 
                src={"https://clips.twitch.tv/embed?clip=" + contentBody.twitchId + "&autoplay=false"} 
                allowFullScreen
            />
        );
    else if (type === NOTE_TYPE_TWITTER)
        return (
             <Tweet
                tweetId={contentBody.tweetId}
            />
        );
    else if (type === NOTE_TYPE_YOUTUBE)
        return (
            <ResponsiveEmbed
                src={`https://youtube.com/embed/${contentBody.videoId}`}
                allowFullScreen    
            />
        );
};

export default withStyles(styles)(NoteContent);
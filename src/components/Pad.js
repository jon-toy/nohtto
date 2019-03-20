import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  card: {
    width: 350,
  },
  actions: {
    display: 'flex',
  },
});

function Pad(props) {
  const { classes, pad } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={pad.meta.title}
        subheader={pad.meta.dateModified}
      />
      <CardContent>
        <Typography component="p">
          Number of Notes: {pad.notes.length}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Pad);
import { Card, CardContent, CardActions, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '20px',
    marginBottom: '20px',
  },
}));

function AuditorInformation({ user }) {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={10}>
        <Card variant="outlined">
          <CardContent>
            <Typography>{user?.company}</Typography>
            <Typography>{user?.language}</Typography>
            <Typography>{user?.disabilities}</Typography>
            <Typography>{user?.description}</Typography>
          </CardContent>
          <CardActions>
            <Link href="#" color="inherit">
              Contact auditor
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AuditorInformation;

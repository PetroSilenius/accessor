import { makeStyles } from '@material-ui/core/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Grid, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: 'calc(100vh - 64px)',
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [user] = useAuthState(auth);

  return (
    <div className={classes.container}>
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid item xs={6}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>{user ? <p>You're logged In</p> : <p>You're logged out.</p>}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;

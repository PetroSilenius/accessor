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
  header: {
    padding: 70,
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [user] = useAuthState(auth);

  return (
    <div className={classes.container}>
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid container justify='center' alignItems='center' className={classes.header}>
          <h1>Welcome to -insert name-!</h1>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" className={classes.card}>
            <CardContent alignItems='center'>
              <p>We are the #1 accessibility auditing platform! </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid container justify='center' alignItems='center'>
        {user ? <p>You are logged In</p> : <p>You are logged out.</p>}
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;

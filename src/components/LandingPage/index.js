import { makeStyles } from '@material-ui/core/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Grid, Card, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: 'calc(100vh - 64px)',
  },
  header: {
    fontSize: 60,
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid item xs={6} >
          <Card variant="outlined" className={classes.card}>
            <CardContent alignItems='center'>
            <Grid container justify="center" alignItems="center" >
              <h1>{t('landing.header')}</h1>
            </Grid>
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

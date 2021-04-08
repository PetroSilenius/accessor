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
  }
}));

function InfoPage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid container justify="center" alignItems="center">
            <h1>About us</h1>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
                <p>The aim of --insert name-- is to connect organizations that need and want their online services to be 
                    accessible to those, who know what accessibility is. The ultimate goal is to include people with disabilities in 
                    the process of designing and producing web services.</p>
                <p></p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default InfoPage;
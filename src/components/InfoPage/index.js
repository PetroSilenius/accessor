import { makeStyles } from '@material-ui/core/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Grid, Card, CardContent, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: 'calc(100vh - 64px)'
  },
  header: {
      padding: 100,
  },
  card: {
    textAlign: 'center'
  },
  grid_item: {
    margin: 10
  }
}));

function InfoPage() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
    <Container>
      <Grid container justify="center" alignItems="stretch" direction="column" md={12} >
        <Grid item justify="center" alignItems="center" className={classes.grid_item}>
          <Card>
            <CardContent textAlign="center" className={classes.card}>         
                <h1>{t('info.info-head')}</h1>
            </CardContent>
          </Card>
        </Grid>  
        <Grid item className={classes.grid_item}>
          <Card variant="outlined" >
            <CardContent className={classes.card}>
                <p>{t('info.info-l1')}</p>
                <p>{t('info.info-l2')}</p>
                <p>{t('info.info-l3')}</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

export default InfoPage;
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px',
  },
  profileImg: {
    width: 100,
    margin: 'auto',
  },
  submitButton: {
    margin: 20,
    '& button': {
      float: 'right',
    },
  },
}));

export default function ProfileCard({ user }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Grid item xs={3}>
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <img className={classes.profileImg} src={user.photoURL} alt="auditor profile" />
          <Grid container justify="center">
            <div style={{ width: 120 }}>
              <Rating name="disabled" value={user.rating} precision={0.5} disabled />
            </div>
          </Grid>
          <Typography variant="h6">{user.company}</Typography>
          <Typography>"{user.description}"</Typography>
          <Typography style={{ fontWeight: 'bold' }}>{user.hourlyRate}€/h</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/posting/${user.id}`)}>
            {t('auditor_listing.contact')}
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

import { Button, Chip, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../utils/i18n';

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
  marginBottom: {
    marginBottom: '20px',
  },
}));

export default function ProfileCard({ user, loggedUserIsAuditor, peripherals }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Grid item sm={6}>
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid item sm={6} md={4}>
            <img className={classes.profileImg} src={user.photoURL} alt="auditor profile" />
          </Grid>
          <Grid item sm={6} md={8}>
            <Typography variant="h6">{user.displayName}</Typography>
            <Typography>{user.company}</Typography>
            <Typography>{user.description}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>{user.hourlyRate}€/h</Typography>
            <Grid item xs={12} className={classes.marginBottom}>
              {peripherals?.map(
                (peripheral) =>
                  user.peripherals?.[peripheral.id] && (
                    <Chip label={peripheral[i18n.language]}></Chip>
                  )
              )}
            </Grid>
            {!loggedUserIsAuditor && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/posting/${user.id}`)}>
                {t('auditor_listing.contact')}
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../firebase';
import ProfileCard from './ProfileCard';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: 'calc(100vh - 64px)',
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
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

export default function AuditorListing() {
  const classes = useStyles();
  const { t } = useTranslation();
  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef.where('auditor', '==', true), {
    idField: 'id',
  });

  return (
    <div className={classes.container}>
      <Container maxWidth="md" style={{ padding: 5 }}>
        <Paper style={{ marginBottom: 20 }}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ textAlign: 'center', padding: 20 }}>
              {t('auditor_listing.header')}
            </Typography>
          </Grid>
        </Paper>
        <Grid container spacing={3} justify="space-evenly">
          {users ? users.map((user) => <ProfileCard user={user} />) : <CircularProgress />}
        </Grid>
      </Container>
    </div>
  );
}

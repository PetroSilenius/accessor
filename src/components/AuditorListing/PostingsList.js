import { useContext } from 'react';
import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../firebase';
import { UserContext } from '../../UserContext';
import PostingCard from './PostingCard';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: '20px',
  },
  header: {
    textAlign: 'center',
    padding: '20px',
  },
}));

function PostingsList() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const postingsRef = firestore.collection('postings');
  const [postings] = useCollectionData(postingsRef.where('auditorId', '==', user.uid), {
    idField: 'id',
  });

  return postings ? (
    <div className={classes.marginBottom}>
      <Paper className={classes.marginBottom}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.header}>
            {t('auditor_listing.posting_header')}
          </Typography>
        </Grid>
      </Paper>
      <Grid container spacing={3} justify="space-evenly">
        {postings.map((posting) => (
          <PostingCard posting={posting} />
        ))}
      </Grid>
    </div>
  ) : null;
}

export default PostingsList;

import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../firebase';
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

function PostingsList({ userId }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const postingsRef = firestore.collection('postings');
  const [postings] = useCollectionData(postingsRef.where('auditorId', '==', userId), {
    idField: 'id',
  });
  const [postingsAsPoster] = useCollectionData(postingsRef.where('posterId', '==', userId), {
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
          <PostingCard posting={posting} key={posting.id} />
        ))}
        {postingsAsPoster
          ? postingsAsPoster.map((posting) => (
              <PostingCard posting={posting} poster={true} key={posting.id} />
            ))
          : null}
      </Grid>
    </div>
  ) : null;
}

export default PostingsList;

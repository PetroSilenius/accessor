import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import PageCard from './PageCard';
import { firestore } from '../../firebase';
import { UserContext } from '../../UserContext';

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
}));

function AuditPosting() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { auditorId } = useParams();
  const user = useContext(UserContext);
  const [pageUrl, setPageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState({ 0: {} });

  const addPage = () => {
    const lastIndex = Object.keys(pages)[Object.keys(pages).length - 1];
    const newIndex = Number(lastIndex) + 1;
    setPages({ ...pages, [newIndex]: {} });
  };

  const changePageUrl = (event) => {
    setPageUrl(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const [field, index] = target.name.split('-');

    const updatedPages = { ...pages };
    updatedPages[index][field] = value;
    setPages(updatedPages);
  };

  const onSubmit = () => {
    const postingRef = firestore.collection(`postings`).doc();
    postingRef.set({
      auditor: firestore.doc(`users/${auditorId}`),
      poster: firestore.doc(`users/${user.uid}`),
      pages: pages,
      description: description,
      pageUrl: pageUrl,
    });
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={10}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <h1>Täytä postauksen tiedot</h1>
              <h2>General information</h2>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="pageUrl"
                    name="pageUrl"
                    label={'Page url'}
                    value={pageUrl}
                    onChange={changePageUrl}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label={'Description'}
                    value={description}
                    onChange={changeDescription}
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {pages &&
          Object.values(pages).map((page, index) => {
            return (
              <PageCard
                pageUrl={page[0]}
                description={page[1]}
                index={index}
                key={index}
                onChange={handleInputChange}
              />
            );
          })}
        <Grid item xs={10}>
          <Grid container justify="space-between">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              onClick={addPage}>
              Add new page
            </Button>

            <Button variant="contained" color="primary" size="large" onClick={onSubmit}>
              {t('user_info.save')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AuditPosting;

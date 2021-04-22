import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid, Snackbar, TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
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
  const [submitted, setSubmitted] = useState(false);

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
    postingRef
      .set({
        auditorId: auditorId,
        posterId: user.uid,
        pages: pages,
        description: description,
        pageUrl: pageUrl,
      })
      .then(() => {
        setSubmitted(true);
      });
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={10}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <h1>{t('audit_posting.header')}</h1>
              {/* Add evaluator info here */}
              <h2>{t('audit_posting.subheader')}</h2>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="pageUrl"
                    name="pageUrl"
                    label={t('audit_posting.subheader')}
                    value={pageUrl}
                    onChange={changePageUrl}
                    variant="outlined"
                    fullWidth
                  />
                  <p>{t('audit_posting.subheader_notice')}</p>{' '}
                </Grid>

                <Grid item xs={12}>
                  <p>{t('audit_posting.description')}</p>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label={t('audit_posting.input_description')}
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
          Object.values(pages).map((index) => {
            return <PageCard index={index} key={index} onChange={handleInputChange} />;
          })}
        <Grid item xs={10}>
          <Grid container justify="space-between">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              onClick={addPage}>
              {t('audit_posting.add_page')}
            </Button>

            <Button variant="contained" color="primary" size="large" onClick={onSubmit}>
              {t('auditor_listing.contact')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={submitted}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={() => setSubmitted(false)}>
        <Alert severity="success" onClose={() => setSubmitted(false)}>
          {t('audit_form.saved')}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AuditPosting;

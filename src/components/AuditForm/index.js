import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Link,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import firebase from 'firebase/app';
import { useContext, useEffect, useState } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../firebase';
import { UserContext } from '../../UserContext';
import Page from './Page';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
  },
  submitButton: {
    margin: 20,
    '& button': {
      float: 'right',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function AuditForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { postingId } = useParams();
  const auditsRef = firestore.collection('audits').doc(postingId);
  const questionsRef = firestore.collection('questions');
  const [questions] = useCollectionData(questionsRef.orderBy('id').limit(25), {
    idField: 'id',
  });
  const postingRef = firestore.doc(`postings/${postingId}`);
  const [posting] = useDocumentData(postingRef);
  const user = useContext(UserContext);
  const [checkedPeripherals, setCheckedPeripherals] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [pages, setPages] = useState([{}]);
  const [submitted, setSubmitted] = useState(false);
  const usersRef = firestore.collection('users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        var fetchedUser = await usersRef.doc(user.uid).get();
        fetchedUser = fetchedUser.data();
        var arr = [];
        Object.keys(fetchedUser.peripherals).forEach((key) => {
          if (fetchedUser.peripherals[key]) {
            arr.push(key);
          }
          setCheckedPeripherals(arr);
        });
        console.log(arr);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.uid) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (posting && posting.pages) {
      const postingPages = Object.values(posting?.pages).map((page) => {
        return { pageUrl: page.pageUrl };
      });
      setPages(postingPages);
    }
  }, [posting]);

  const submitForm = async (e) => {
    console.log(user);
    e.preventDefault();
    let auditData = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.uid,
    };
    let auditPageData = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    auditsRef
      .set(auditData)
      .then(() => {
        console.log(auditData, 'successfully written!');
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    pages.forEach((page) => {
      auditsRef
        .collection('pages')
        .add(page)
        .then(() => {
          console.log(auditPageData, 'successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    });
    return false;
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <form name="page_audit" onSubmit={submitForm}>
          <Grid container spacing={1} justify="center">
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardContent>
                  <h1>{t('audit_form.header')}</h1>
                  {posting && (
                    <>
                      <Link color="initial" href={posting.pageUrl}>
                        {posting.pageUrl}
                      </Link>
                      <p>{posting.description}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardContent>
                  <Tabs
                    value={activeTab}
                    onChange={(e, n) => {
                      setActiveTab(n);
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="simple tabs example">
                    {pages.map((page, idx) => (
                      <Tab key={idx} label={t('audit_form.page') + (idx + 1)} {...a11yProps(idx)} />
                    ))}
                    <Tab
                      label={t('audit_form.add_page')}
                      onClick={() => {
                        var arr = [...pages];
                        arr.push({});
                        setPages(arr);
                      }}
                      {...a11yProps(pages.length)}
                    />
                  </Tabs>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={10}>
              {checkedPeripherals
                ? pages.map((page, id) => (
                    <Grid key={id} item xs={12}>
                      <TabPanel value={activeTab} index={id}>
                        <Page
                          id={id}
                          checkedPeripherals={checkedPeripherals}
                          questions={questions}
                          posting={posting}
                          setPages={setPages}
                          pages={pages}
                        />
                      </TabPanel>
                    </Grid>
                  ))
                : null}
            </Grid>
            <Grid item xs={10} className={classes.submitButton}>
              <Button variant="contained" color="primary" size="large" type="submit">
                {t('audit_form.submit')}
              </Button>
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
        </form>
      </Container>
    </div>
  );
}

export default AuditForm;

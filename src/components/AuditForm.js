import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { firestore } from '../firebase';
import firebase from 'firebase/app';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
  submitButton: {
    margin: 20,
    '& button': {
      float: 'right',
    },
  },
}));
/**
 * Checks if the question needs to be excluded due to peripheral selections
 * @param {json} question
 */

const checkExclusions = (question, checkedPeripherals) => {
  var b = true;
  if (question.excluded_peripherals) {
    question.excluded_peripherals.forEach((i) => {
      if (checkedPeripherals[i]) {
        console.log(question.fi, 'excluded');
        b = false;
      }
    });
  }
  return b;
};

/*
const peripherals = [
  {id: 1, en: "Screen reader", fi: "Ruudunlukija"},
  {id: 2, en: "Keyboard", fi: "Näppäimistö"},
  {id: 3, en: "Mouse", fi: "Hiiri"},
] */

function UserInfo(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const peripheralsRef = firestore.collection('peripherals');
  const [peripherals] = useCollectionData(peripheralsRef);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>{t('audit_form.header')}</h1>
            <h2>{t('user_info.header')}</h2>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => {
                i18n.changeLanguage(i18n.language === 'fi' ? 'en' : 'fi');
              }}>
              {t('user_info.change_lang')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{t('user_info.peripherals')}</FormLabel>
              <FormGroup row>
                {peripherals
                  ? peripherals.map((p) => (
                      <FormControlLabel
                        key={p.id}
                        control={
                          <Checkbox
                            name={p[i18n.language]}
                            id={`${p.id}`}
                            onChange={props.handleChange}
                            color="primary"
                          />
                        }
                        label={p[i18n.language]}
                      />
                    ))
                  : undefined}
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('user_info.description')}
              fullWidth
              onChange={(e) => {
                props.setUser({ ...props.user, description: e.target.value });
              }}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('user_info.company')}
              fullWidth
              onChange={(e) => {
                props.setUser({ ...props.user, company: e.target.value });
              }}></TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Questions(props) {
  const questions = props.questions;
  const checkedPeripherals = props.checkedPeripherals;
  const [questionObjects, setQuestionObjects] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();

  const createQuestions = () => {
    var index = 1;
    var arr = [];

    questions.forEach((question) => {
      if (checkExclusions(question, checkedPeripherals)) {
        arr.push(
          <Grid item xs={10} key={index}>
            <Card className={classes.card}>
              <CardContent>
                <h3>{question[i18n.language]}</h3>
                <TextField
                  id={`${question.id}`}
                  name={`${question.id}`}
                  label={`${t('audit_form.question')} ${index}`}
                  fullWidth
                  multiline
                />
              </CardContent>
            </Card>
          </Grid>
        );
        index++;
      }
    });
    setQuestionObjects(arr);
  };

  useEffect(() => {
    if (questions) {
      setQuestionObjects([]);
      createQuestions();
    }
  }, [questions, checkedPeripherals, i18n.language]);

  return <>{questionObjects}</>;
}

function AuditForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const auditsRef = firestore.collection('audits').doc();
  const questionsRef = firestore.collection('questions');
  const [questions] = useCollectionData(questionsRef.orderBy('id').limit(25), { idField: 'id' });
  const [checkedPeripherals, setCheckedPeripherals] = useState({});
  const [user, setUser] = useState({
    description: '',
    peripherals: [],
    company: '',
  });

  useEffect(() => {
    setUser({ ...user, language: i18n.language });
  }, [i18n.language]);

  const handleChange = (event) => {
    var obj = { ...checkedPeripherals, [event.target.id]: event.target.checked ? true : undefined };
    setCheckedPeripherals(obj);
    var arr = [];
    Object.keys(obj).map((key) => {
      arr.push(key);
    });
    setUser({ ...user, peripherals: arr });
  };

  const submitForm = async (e) => {
    let auditData = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user,
    };
    let auditPageData = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    let auditPageQuestions = {};

    e.preventDefault();
    Object.keys(e.target.elements).map((key) => {
      if (e.target.elements[key].tagName === 'INPUT' && key === 'pageUrl') {
        Object.assign(auditPageData, { [key]: e.target.elements[key].value });
      } else if (e.target.elements[key].tagName === 'TEXTAREA' && key.length === 20) {
        Object.assign(auditPageQuestions, { [key]: e.target.elements[key].value });
      }
    });
    Object.assign(auditPageData, { questions: auditPageQuestions });
    console.log(auditPageQuestions);
    auditsRef
      .set(auditData)
      .then(() => {
        console.log(auditData, 'successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    auditsRef
      .collection('pages')
      .add(auditPageData)
      .then(() => {
        console.log(auditPageData, 'successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    return false;
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <form name="page_audit" onSubmit={submitForm}>
          <Grid container spacing={1} justify="center">
            <Grid item xs={10}>
              <UserInfo handleChange={handleChange} setUser={setUser} user={user} />
            </Grid>
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardContent>
                  <h2>{t('audit_form.instructions_header')}</h2>
                  <h3>{t('audit_form.page_url')}</h3>
                  <TextField
                    required
                    id="pageUrl"
                    name="pageUrl"
                    label={t('audit_form.page_url')}
                    fullWidth
                  />
                </CardContent>
              </Card>
            </Grid>
            <Questions checkedPeripherals={checkedPeripherals} questions={questions} />
            <Grid item xs={10} className={classes.submitButton}>
              <Button variant="contained" color="primary" size="large" type="submit">
                {t('audit_form.submit')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default AuditForm;

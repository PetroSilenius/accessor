import { Button, Container, Grid, Paper, TextField } from '@material-ui/core';
import { firestore } from '../firebase';

/*
Esitiedot auditoijalta:
mitä apulaitteita käyttää
Text-to-speech
Braille lukija
Käyttääkö hiirtä
Disability (heikentynyt värinäkö, näkövammaisuus, kuulovammaisuus, kuurous, kognitiiviset ja kielelliset vaikeudet)
Oma kuvaus
Auditointiin liittyvä kokemus / tekninen osaaminen / internetin käyttö
*/

const questions = [
  'Did you understand the purpose of non-text elements? Describe your experience. Did you encounter any difficulties?',
  'Did you understand the essence of video / audio content? Was something unclear?',
  'Did you receive the content in a format that suits you? If the site asked you for information, could you figure out why the information was needed?',
  'Did you have difficulties distinguishing the content from the background?',
  'Were you able to access the site without a mouse / keyboard only?',
  'Did you have time to go through the entire content of the page? Was there enough time reserved for interpreting each piece of content?',
  'Did any part of the page cause you symptoms?',
  'Was the site easy to navigate? Were you able to find content clearly?',
  'Were you also able to perform more complex operations with your own input method (e.g. dragging, double-clicking)?',
  'Was the text content of the page understandable? (Plain language, use of abbreviations, etc.)',
  'Did something surprising happen while using the page?',
  'Did you receive appropriate instructions for inputting info? Did the page report about potential errors in the formatting of the input, for example?',
];

function AuditForm() {
  const auditsRef = firestore.collection('audits');

  const submitForm = async (e) => {
    var data = {};
    e.preventDefault();
    Object.keys(e.target.elements).map((key) => {
      if (key === 'pageUrl' || key.includes('question')) {
        Object.assign(data, { [key]: e.target.elements[key].value });
      }
    });
    auditsRef
      .add(data)
      .then(() => {
        console.log(data, 'successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    return;
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={submitForm}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ padding: 20 }}>
              <h2>Audit form</h2>
              <TextField required id="pageUrl" name="pageUrl" label="Page url" fullWidth />
            </Paper>
          </Grid>
          {questions.map((question, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper style={{ padding: 20 }}>
                <h2>{question}</h2>
                <TextField
                  id={`question${idx + 1}`}
                  name={`question${idx + 1}`}
                  label={`Question ${idx + 1}`}
                  fullWidth
                />
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" type="submit">
              {'Send answers'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AuditForm;

import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import firebase from "../firebase";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

const firestore = firebase.firestore();
const en_questions = [
  {id: 1, question:"Did you understand the purpose of non-text elements? Describe your experience. Did you encounter any difficulties?"},
  {id: 2, question:"Did you understand the essence of video / audio content? Was something unclear?"},
  {id: 3, question:"Did you receive the content in a format that suits you? If the site asked you for information, could you figure out why the information was needed?"},
  {id: 4, question:"Did you have difficulties distinguishing the content from the background?"},
  {id: 5, question:"Were you able to access the site without a mouse / keyboard only?"},
  {id: 6, question:"Did you have time to go through the entire content of the page? Was there enough time reserved for interpreting each piece of content?"},
  {id: 7, question:"Did any part of the page cause you symptoms?"},
  {id: 8, question:"Was the site easy to navigate? Were you able to find content clearly?"},
  {id: 9, question:"Were you also able to perform more complex operations with your own input method (e.g. dragging, double-clicking)?"},
  {id: 10, question:"Was the text content of the page understandable? (Plain language, use of abbreviations, etc.)"},
  {id: 11, question:"Did something surprising happen while using the page?"},
  {id: 12, question:"Did you receive appropriate instructions for inputting info? Did the page report about potential errors in the formatting of the input, for example?"},
];


const fi_questions = [
  {id: 1, question:"Ymmärsitkö sellaisten elementtien tarkoituksen, jotka eivät olleet tekstiä? Kerro kokemuksestasi. Kohtasitko vaikeuksia?"},
  {id: 2, question:"Ymmärsitkö videon / äänitteen sisällön? Jäikö jotain epäselväksi?"},
  {id: 3, question:"Saitko palvelun sisällön sinulle sopivassa muodossa? Mikäli sivusto pyysi sinulta tietoja, selvisikö sinulle mihin tietoja tarvitaan?"},
  {id: 4, question:"Oliko sinulla vaikeuksia erottaa sisältöä taustasta?"},
  {id: 5, question:"Pystyitkö käyttämään sivustoa pelkällä näppäimistöllä?"},
  {id: 6, question:"Ehditkö käydä sivuston koko sisällön läpi? Oliko sivustolla sisältöä, jonka tulkitsemiseen varattu aika ei ollut riittävä?"},
  {id: 7, question:"Aiheuttiko jokin sivuston osa sinulle sairauskohtauksen oireita?"},
  {id: 8, question:"Oliko sivustolla siirtyminen helppoa? Löytyikö kaikki sisältö selkeästi?"},
  {id: 9, question:"Pystyitkö tekemään myös monimutkaisempia toimintoja omalla syötetavallasi (esimerkiksi raahaus, tuplaklikkaus)?"},
  {id: 10, question:"Oliko sivuston tekstisisältö ymmärrettävää? (Selkokieli, lyhenteiden käyttö  yms.)"},
  {id: 11, question:"Tapahtuiko sivuston käytössä jotain yllättävää?"},
  {id: 12, question:"Saitko tarkoituksenmukaiset ohjeet syötteiden antamiseen? Ilmoittiko sivusto mahdollisista virheistä esimerkiksi syötteen muotoilussa?"},
];

const useStyles = makeStyles((theme) =>({
  paper : {
    padding:20
  }
}))

function AuditForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const auditsRef = firestore.collection("audits");
  const [questions, setQuestions] = useState(en_questions);

  useEffect(()=>{
    if(i18n.language === "en"){
      setQuestions(en_questions)
    }else if(i18n.language === "fi"){
      setQuestions(fi_questions)
    }
  },[i18n.language])

  const submitForm = async (e) => {
    var data = {
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      language : i18n.language
    };
    e.preventDefault();
    Object.keys(e.target.elements).map((key) => {
      if (e.target.elements[key].tagName === "INPUT") {
        Object.assign(data, { [key]: e.target.elements[key].value });
      }
    });
    auditsRef
      .add(data)
      .then(() => {
        console.log(data, "successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    return;
  };

  return (

      <form style={{marginTop:30}} onSubmit={submitForm}>
        <Grid container spacing={3}>
                  {/* User info */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Button
            variant="outlined"
            onClick={() => {
              i18n.changeLanguage(i18n.language === "fi" ? "en" : "fi");
            }}
          >
            {i18n.language === "fi" ? "In English" : "Suomeksi"}
          </Button>
          </Paper>
        </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h2>{t("audit_form.header")}</h2>
              <TextField
                required
                id="pageUrl"
                name="pageUrl"
                label={t("audit_form.page_url")}
                fullWidth
              />
            </Paper>
          </Grid>
          {questions.map((question, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper className={classes.paper}>
                <h2>{question.question}</h2>
                <TextField
                  id={`${question.id}`}
                  name={`${question.id}`}
                  label={`${t("audit_form.question")} ${idx + 1}`}
                  fullWidth
                />
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" type="submit">
              {t("audit_form.submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
  );
}

export default AuditForm;

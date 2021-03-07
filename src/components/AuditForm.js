import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import firebase from "../firebase";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  user_info:{
    padding:5
  }
}));
/**
 * Checks if the question needs to be excluded due to peripheral selections
 * @param {json} question 
 */


const checkExclusions = (question, checkedPeripherals) =>{
  var b = true;
  if(question.excluded_peripherals){
    question.excluded_peripherals.forEach(i =>{
      if(checkedPeripherals[i]){
        console.log(question.fi, "excluded")
        b = false;
      }
    })
  }
  return b;
} 

/*
const peripherals = [
  {id: 1, en: "Screen reader", fi: "Ruudunlukija"},
  {id: 2, en: "Keyboard", fi: "Näppäimistö"},
  {id: 3, en: "Mouse", fi: "Hiiri"},
] */

function UserInfo(props){
  const classes = useStyles();
  const {t} = useTranslation();
  const peripheralsRef = firestore.collection("peripherals");
  const [peripherals] = useCollectionData(peripheralsRef);

  return(
  <Grid container>
    <Paper className={classes.paper} style={{width:"100%"}}>
      <h2>{t("user_info.header")}</h2>
      <Grid item xs={12} className={classes.user_info}>
        <Button
          variant="outlined"
          onClick={() => {
            i18n.changeLanguage(i18n.language === "fi" ? "en" : "fi");
          }}
        >
          {i18n.language === "fi" ? "In English" : "Suomeksi"}
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.user_info}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{t("user_info.peripherals")}</FormLabel>
        <FormGroup row>
          {peripherals? 
            peripherals.map(p=>(
              <FormControlLabel key={p.id}
              control={<Checkbox name={p[i18n.language]} id={`${p.id}`} onChange={props.handleChange} color="primary" />}
              label={p[i18n.language]}
              />
          )):undefined}
        </FormGroup>
      </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.user_info}>
            <TextField label={t("user_info.disabilities")} fullWidth onChange={(e)=>{props.setUser({...props.user, disabilities : e.target.value})}}></TextField>
      </Grid>
      <Grid item xs={12} className={classes.user_info}>
            <TextField label={t("user_info.description")} fullWidth onChange={(e)=>{props.setUser({...props.user, description : e.target.value})}}></TextField>
      </Grid>
      <Grid item xs={12} className={classes.user_info}>
            <TextField label={t("user_info.company")} fullWidth onChange={(e)=>{props.setUser({...props.user, company : e.target.value})}}></TextField>
      </Grid>
    </Paper>
</Grid>
)
}



function Questions(props){
  const questions = props.questions;
  const checkedPeripherals = props.checkedPeripherals;
  const [questionObjects,setQuestionObjects] = useState([]);
  const classes = useStyles();
  const {t} = useTranslation();

  const createQuestions = () =>{
    var index = 1;
    var arr = []

    questions.forEach(question =>{
      if(checkExclusions(question, checkedPeripherals)){
        arr.push(
          <Grid item xs={12} key={index}>
            <Paper className={classes.paper}>
              <h2>{question[i18n.language]}</h2>
              <TextField
                id={`${question.id}`}
                name={`${question.id}`}
                label={`${t("audit_form.question")} ${index}`}
                fullWidth
              />
            </Paper>
          </Grid>
        )
        index++;
      }
    })
    setQuestionObjects(arr);
  }

  useEffect(()=>{
    if(questions){
      setQuestionObjects([])
      createQuestions()
    }
  },[questions,checkedPeripherals, i18n.language])


  return(
    <React.Fragment>
      {questionObjects}
    </React.Fragment>
  );
}




function AuditForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const auditsRef = firestore.collection("audits");
  const questionsRef = firestore.collection("questions");
  const [questions] = useCollectionData(questionsRef.orderBy("id").limit(25), { idField: "id" });
  const [checkedPeripherals, setCheckedPeripherals] = useState({});
  const [user, setUser] = useState({
    disabilities : "",
    description : "",
    peripherals : [],
    company : ""
  })


  useEffect(()=>{
    setUser({...user, language: i18n.language})
  },[i18n.language])

  const handleChange = (event) => {
    var obj = {...checkedPeripherals, [event.target.id]: (event.target.checked)?true:undefined }
    setCheckedPeripherals(obj);
    var arr = []
    Object.keys(obj).map((key)=>{
      arr.push(key)
    })
    setUser({...user, peripherals: arr})
  };

  const submitForm = async (e) => {
    var data = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user
    };
    e.preventDefault();
    Object.keys(e.target.elements).map((key) => {
      if (e.target.elements[key].tagName === "INPUT") {
        if (key === "pageUrl") {
          Object.assign(data, { [key]: e.target.elements[key].value });
        } else if (key.length === 20) {
          Object.assign(data, { [key]: e.target.elements[key].value });
        }
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
    <React.Fragment>
    <UserInfo handleChange={handleChange} setUser={setUser} user={user}/>
    <form style={{ marginTop: 30 }} onSubmit={submitForm}>
      <Grid container spacing={3}>
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
        <Questions checkedPeripherals={checkedPeripherals} questions={questions}/>
        <Grid item xs={12}>
          <Button variant="outlined" type="submit">
            {t("audit_form.submit")}
          </Button>
        </Grid>
      </Grid>
    </form>
    </React.Fragment>
  );
}

export default AuditForm;

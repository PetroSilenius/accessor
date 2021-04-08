import {
  Card,
  CardContent,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../utils/i18n";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
    marginTop: 5,
  },
  submitButton: {
    margin: 20,
    "& button": {
      float: "right",
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
        b = false;
      }
    });
  }
  return b;
};

function Question({ question, handleChange, index, page }) {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState([]);
  const handleRadioButtons = (event, index) => {
    var arr = [...radioValue];
    if (arr[index]) {
      arr[index] = event.target.value;
    } else {
      arr.push(event.target.value);
    }
    setRadioValue(arr);
  };

  const checkRadioAnswers = (idx) => {
    if (idx || idx === 0) {
      if (idx === 0 || page[question.id]) {
        return true;
      }
      var a = question.preQuestions[idx - 1].expectedAnswer;
      if (radioValue[idx - 1] === a.toString()) {
        return true;
      }
      return false;
    }
    if (
      !question.preQuestions ||
      question.preQuestions.length === 0 ||
      page[question.id]
    ) {
      return true;
    }
    if (radioValue.length === 0) {
      return false;
    }
    for (let index = 0; index < question.preQuestions.length; index++) {
      const element = question.preQuestions[index];
      var ans = element.expectedAnswer.toString();
      if (ans !== radioValue[index]) {
        return false;
      }
    }
    return true;
  };

  const getRadioValue = (idx) => {
    if (
      page[question.id] &&
      question.preQuestions &&
      question.preQuestions.length !== 0 &&
      question.preQuestions[idx]
    ) {
      return question.preQuestions[idx].expectedAnswer.toString();
    }
    if (radioValue[idx]) {
      return radioValue[idx];
    }
    var a = !question.preQuestions[idx].expectedAnswer;
    return a.toString();
  };

  return question ? (
    <CardContent>
      {question.preQuestions && question.preQuestions.length !== 0
        ? question.preQuestions.map((q, idx) =>
            checkRadioAnswers(idx) ? (
              <React.Fragment>
                <h3>{q[i18n.language]}</h3>
                <RadioGroup
                  key={idx}
                  name={"preq" + idx}
                  value={getRadioValue(idx)}
                  onChange={(e) => handleRadioButtons(e, idx)}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label={t("audit_form.yes")}
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label={t("audit_form.no")}
                  />
                </RadioGroup>
              </React.Fragment>
            ) : undefined
          )
        : undefined}
      {checkRadioAnswers() ? (
        <React.Fragment>
          <h3>{question[i18n.language]}</h3>
          <TextField
            id={`${question.id}`}
            name={`${question.id}`}
            label={`${t("audit_form.question")} ${index + 1}`}
            fullWidth
            multiline
            defaultValue={page[question.id]}
            onChange={(e) => handleChange(e, question.id)}
          />
        </React.Fragment>
      ) : undefined}
    </CardContent>
  ) : null;
}

export default function Questions(props) {
  const questions = props.questions;
  const checkedPeripherals = props.checkedPeripherals;
  const page = props.pages[props.id];
  const classes = useStyles();

  const handleChange = (e, id) => {
    var arr = [...props.pages];
    var obj = { ...props.pages[props.id], [id]: e.target.value };
    arr[props.id] = obj;
    props.setPages(arr);
  };

  return (
    <>
      {questions
        ? questions.map((question, index) =>
            checkExclusions(question, checkedPeripherals) ? (
              <Card key={index} className={classes.card}>
                <Question
                  question={question}
                  handleChange={handleChange}
                  index={index}
                  page={page}
                />
              </Card>
            ) : undefined
          )
        : undefined}
    </>
  );
}

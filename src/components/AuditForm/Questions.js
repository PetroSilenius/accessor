import { Card, CardContent, makeStyles, TextField } from "@material-ui/core";
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
        console.log(question.fi, "excluded");
        b = false;
      }
    });
  }
  return b;
};

export default function Questions(props) {
  const questions = props.questions;
  const checkedPeripherals = props.checkedPeripherals;
  const page = props.pages[props.id];
  const classes = useStyles();
  const { t } = useTranslation();

  let handleChange = (e, id) => {
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
                <CardContent>
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
                </CardContent>
              </Card>
            ) : undefined
          )
        : undefined}
    </>
  );
}

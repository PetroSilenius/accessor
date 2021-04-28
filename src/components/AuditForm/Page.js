import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import Questions from "./Questions";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
  },
  submitButton: {
    margin: 20,
    "& button": {
      float: "right",
    },
  },
}));

export default function Page({
  id,
  checkedPeripherals,
  questions,
  setPages,
  pages,
  posting,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  let handleChange = (e) => {
    var arr = [...pages];
    var obj = { ...arr[id], pageUrl: e.target.value };
    arr[id] = obj;
    setPages(arr);
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <h2>{t("audit_form.instructions_header")}</h2>
          <h3>{t("audit_form.page_url")}</h3>
          <Typography>{pages[id].pageUrl}</Typography>
          <p>{posting?.pages[id]?.description}</p>
        </CardContent>
      </Card>
      <Questions
        checkedPeripherals={checkedPeripherals}
        questions={questions}
        setPages={setPages}
        pages={pages}
        id={id}
      />
    </React.Fragment>
  );
}

import { Card, CardContent, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { firestore } from "../../firebase";
import i18n from "../../utils/i18n";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
  },
}));

function AuditReportQuestions({ auditId, pageId, questions }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const auditPageRef = firestore.doc(`audits/${auditId}/pages/${pageId}`);
  const [page] = useDocumentData(auditPageRef);

  return (
    <Grid container spacing={2} justify="center" className={classes.container}>
      <Grid item xs={10}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <h2>{t("audit_report.subheader")}</h2>
            <p>{t("audit_report.description")}</p>
          </CardContent>
        </Card>
      </Grid>
      {questions?.map((question, key) => (
        <Grid item xs={10} key={key}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <h3>{question[i18n.language]}</h3>
              <p>{page?.[question.id]}</p>
              <Link
                href={`https://www.w3.org/TR/WCAG21/#${question.wcag}`}
                target="_blank"
                rel="noreferrer"
                color="error"
              >
                <b>{t("audit_report.need_help")}</b>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default AuditReportQuestions;

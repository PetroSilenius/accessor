import { useEffect } from 'react';
import { firestore } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import i18n from '../../utils/i18n';
import { Card, CardContent, CardActions, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.grey[200],
  },
}));

function AuditReportQuestions({ auditId, pageId, questions }) {
  const classes = useStyles();
  useEffect(() => {}, []);
  const auditPageRef = firestore.doc(`audits/${auditId}/pages/${pageId}`);
  const [page] = useDocumentData(auditPageRef);

  return (
    <Grid container spacing={2} justify="center" className={classes.container}>
      {questions?.map((question, key) => (
        <Grid item xs={10} key={key}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <Typography variant="h5">{question[i18n.language]}</Typography>
              <Typography>{page?.questions[question.id]}</Typography>
            </CardContent>
            <CardActions>
              <Link
                href={`https://www.w3.org/TR/WCAG21/#${question.wcag}`}
                target="_blank"
                rel="noreferrer"
                color="inherit">
                Need help with this?
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default AuditReportQuestions;

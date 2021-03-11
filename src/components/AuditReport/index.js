import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AuditReportQuestions from './AuditReportQuestions';
import AuditorInformation from './AuditorInformation';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  },
  tabs: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function AuditReport() {
  const classes = useStyles();
  const { auditId } = useParams();
  const auditRef = firestore.doc(`audits/${auditId}`);
  const [audit] = useDocumentData(auditRef, { idField: 'id' });
  const pagesRef = auditRef.collection(`pages`);
  const pages = useCollectionData(pagesRef, { idField: 'id' });
  const questionsRef = firestore.collection('questions').orderBy('id');
  const [questions] = useCollectionData(questionsRef, { idField: 'id' });

  const [pageId, setPageId] = useState();

  useEffect(() => {
    setPageId(pages?.[0]?.[0].id);
  }, []);

  const handleChange = (event, newValue) => {
    setPageId(newValue);
  };

  return (
    <div className={classes.container}>
      <Paper>
        <Tabs
          value={pageId ?? pages?.[0]?.[0]?.id}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}>
          {pages[0]?.map((page) => (
            <Tab label={page.pageUrl} value={page.id} key={page.id} />
          ))}
        </Tabs>
      </Paper>

      <AuditorInformation user={audit?.user} />

      <AuditReportQuestions
        auditId={auditId}
        pageId={pageId ?? pages?.[0]?.[0]?.id}
        questions={questions}
      />
    </div>
  );
}

export default AuditReport;

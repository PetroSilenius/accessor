import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { Paper, Tabs, Tab } from '@material-ui/core';
import AuditReportQuestions from './AuditReportQuestions';

function AuditReport() {
  const { auditId } = useParams();
  const auditRef = firestore.doc(`audits/${auditId}`);
  const [pageId, setPageId] = useState('Bl97iRBILC0gOYmUgtbc');
  const questionsRef = firestore.collection('questions');
  const [questions] = useCollectionData(questionsRef, { idField: 'id' });

  /*
  Get pages ids

  useEffect(() => {
    const getPages = async () => {
      let pages = [];
      await firestore
        .collection('audits')
        .doc(auditId)
        .collection('pages')
        .get()
        .then((snapshot) => snapshot.forEach((doc) => pages.push(doc.id)));
      return pages;
    };
    setPageId(getPages().json());
  }, []);
  */

  const handleChange = (event, newValue) => {
    setPageId(newValue);
  };

  const [audit] = useDocumentData(auditRef, { idField: 'id' });

  return (
    <>
      <Paper>
        <Tabs
          value={pageId}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>

      <AuditReportQuestions auditId={auditId} pageId={pageId} questions={questions} />
    </>
  );
}

export default AuditReport;

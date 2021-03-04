import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

function AuditReport() {
  const { auditId } = useParams();
  console.log(auditId);
  const auditsRef = firestore.doc(`audits/${auditId}`);

  const [audit] = useDocumentData(auditsRef, { idField: 'id' });
  return (
    <>
      <p>{audit}</p>
    </>
  );
}

export default AuditReport;

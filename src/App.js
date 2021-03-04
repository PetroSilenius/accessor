import React from 'react';
import AuditForm from './components/AuditForm';
import { Grid } from '@material-ui/core';

/*

Esitiedot auditoijalta: 
mitä apulaitteita käyttää
Text-to-speech
Braille lukija
Käyttääkö hiirtä
Disability (heikentynyt värinäkö, näkövammaisuus, kuulovammaisuus, kuurous, kognitiiviset ja kielelliset vaikeudet)
Oma kuvaus
Auditointiin liittyvä kokemus / tekninen osaaminen / internetin käyttö


*/




function App() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <AuditForm />
      </Grid>
    </React.Fragment>
  );
}

export default App;

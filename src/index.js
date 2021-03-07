import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import AuditForm from './components/AuditForm';
import AuditReport from './components/AuditReport';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './utils/i18n';

ReactDOM.render(
  <StrictMode>
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/report/:auditId">
          <AuditReport />
        </Route>
        <Route path="/">
          <AuditForm />
        </Route>
      </Switch>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

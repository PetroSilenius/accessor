import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Topbar from './components/Topbar';
import AuditForm from './components/AuditForm';
import AuditReport from './components/AuditReport';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import './utils/i18n';
import theme from './theme';

ReactDOM.render(
  <StrictMode>
    <UserProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Topbar />
          <Switch>
            <Route path="/report/:auditId">
              <AuditReport />
            </Route>
            <Route path="/audit">
              <AuditForm />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </UserProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

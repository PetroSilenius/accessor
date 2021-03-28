import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { StrictMode, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuditForm from './components/AuditForm';
import AuditorListing from './components/AuditorListing';
import AuditReport from './components/AuditReport';
import LandingPage from './components/LandingPage';
import AuditPosting from './components/AuditPosting';
import Profile from './components/Profile';
import Topbar from './components/Topbar';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import { UserContext, UserProvider } from './UserContext';
import './utils/i18n';

function FrontPage() {
  const user = useContext(UserContext);
  if (user) {
    return <AuditorListing />;
  }
  return <LandingPage />;
}

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
            <Route path="/posting/:auditorId">
              <AuditPosting />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <FrontPage />
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

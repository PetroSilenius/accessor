import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { StrictMode, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import theme from './theme';
import { UserContext, UserProvider } from './UserContext';
import { firestore } from './firebase';
import './utils/i18n';

import AuditForm from './components/AuditForm';
import AuditorListing from './components/AuditorListing';
import AuditReport from './components/AuditReport';
import LandingPage from './components/LandingPage';
import AuditPosting from './components/AuditPosting';
import Profile from './components/Profile';
import Topbar from './components/Topbar';
import InfoPage from './components/InfoPage';

function FrontPage() {
  const history = useHistory();
  const user = useContext(UserContext);
  const usersRef = firestore.collection('users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await usersRef.doc(user.uid).get();
        const userData = fetchedUser.data();

        !userData.auditor && userData.auditor !== false && history.push('/profile');
      } catch (err) {
        console.error(err);
      }
    };
    user?.uid && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, history]);

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
            <Route path="/info">
              <InfoPage />
            </Route>
            <Route path="/report/:auditId">
              <AuditReport />
            </Route>
            <Route path="/audit/:postingId?">
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

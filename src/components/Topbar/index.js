import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Link,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Mail, AccountCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  link: {
    fontSize: '1.1rem',
    padding: '0 10px',
  },
  textDecoration: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then(() => {
      console.log('logged in');
    })
    .catch((error) => {
      console.log(error);
    });
};

function Topbar() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setAnchorEl(null);
        console.log('logged out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          component={RouterLink}
          to={'/'}
          color="secondary"
          className={`${classes.link} ${classes.textDecoration}`}>
          <b>Accessor</b>
        </Link>
        <Link
          component={RouterLink}
          to={'/audit'}
          color="secondary"
          className={`${classes.link} ${classes.textDecoration}`}>
          {t('top_bar.audit')}
        </Link>
        <Link
          component={RouterLink}
          to={'/report/q8eiRHBVXvOLEtsQMzKe'}
          color="secondary"
          className={`${classes.link} ${classes.textDecoration}`}>
          {t('top_bar.example_report')}
        </Link>
        <Link
          component={RouterLink}
          to={'/info'}
          color="secondary"
          className={`${classes.link} ${classes.textDecoration}`}>
          INFO
        </Link>
        <div className={classes.grow} />
        <Tooltip title={user ? '' : 'Log In'}>
          <IconButton onClick={user ? handleProfileClick : signInWithGoogle} color="inherit">
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}>
          <Link
            component={RouterLink}
            to={'/profile'}
            onClick={() => setAnchorEl(null)}
            className={classes.textDecoration}>
            <MenuItem>{t('top_bar.profile')}</MenuItem>
          </Link>
          <MenuItem onClick={signOut}>{t('top_bar.log_out')}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Link, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import { auth } from '../../firebase';
import i18n from '../../utils/i18n';

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
  const history = useHistory();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setAnchorEl(null);
        history.push('/');
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
          <img src="/android-chrome-192x192.png" alt="Accessor-logo" width="48px" height="48px" />
        </Link>
        {/* <Link
          component={RouterLink}
          to={'/info'}
          color="secondary"
          className={`${classes.link} ${classes.textDecoration}`}>
          INFO
        </Link>*/}

        <div className={classes.grow} />

        <IconButton
          color="inherit"
          onClick={() => {
            i18n.changeLanguage(i18n.language === 'fi' ? 'en' : 'fi');
          }}>
          {t('user_info.change_lang')}
        </IconButton>

        <Tooltip title={user ? '' : 'Log In'}>
          <IconButton onClick={user ? handleProfileClick : signInWithGoogle} color="inherit">
            <AccountCircle fontSize="large" />
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

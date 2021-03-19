import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  Container,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';
import i18n from '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../UserContext';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: 'calc(100vh - 64px)',
  },
}));

function Profile() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const peripheralsRef = firestore.collection('peripherals');
  const [peripherals] = useCollectionData(peripheralsRef);
  //const userRef = firestore.doc(`users/${user?.uid}`);
  //const [userData] = useDocumentData(userRef);

  console.log(user?.uid);
  const [selectedPeripherals, setSelectedPeripherals] = useState({ 1: false, 2: false, 3: false });
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    const userRef = firestore.doc(`users/${user?.uid}`);
    userRef
      .get()
      .then((doc) => {
        const data = doc.data();
        if (data) {
          setSelectedPeripherals(data?.peripherals);
          setDescription(data?.description);
          setCompany(data?.company);
        }
      })
      .catch((error) => console.log(error));
  }, [user?.uid]);

  console.log(selectedPeripherals);

  const peripheralsOnChange = (event) => {
    setSelectedPeripherals({ ...selectedPeripherals, [event.target.id]: event.target.checked });
  };
  const descriptionOnChange = (event) => {
    setDescription(event.target.value);
  };
  const companyOnChange = (event) => {
    setCompany(event.target.value);
  };

  const onSubmit = () => {
    const userRef = firestore.doc(`users/${user?.uid}`);
    userRef.set({ peripherals: selectedPeripherals, description: description, company: company });
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <Grid container justify="center" alignItems="center" className={classes.container}>
          <Grid item xs={10}>
            <Card variant="outlined" className={classes.card}>
              <CardContent>
                {user ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <h1>Your information</h1>
                    </Grid>
                    <Grid item xs={12}>
                      <img src={user.photoURL} alt={`${user.displayName} profile`} />
                      <p>{user.displayName}</p>
                      <p>{user.email}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">{t('user_info.peripherals')}</FormLabel>
                        <FormGroup row>
                          {peripherals?.map((p) => (
                            <FormControlLabel
                              key={p.id}
                              control={
                                <Checkbox
                                  name={p[i18n.language]}
                                  id={`${p.id}`}
                                  color="primary"
                                  checked={selectedPeripherals?.[p.id]}
                                  onChange={peripheralsOnChange}
                                />
                              }
                              label={p[i18n.language]}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={t('user_info.description')}
                        value={description}
                        onChange={descriptionOnChange}
                        fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={t('user_info.company')}
                        value={company}
                        onChange={companyOnChange}
                        fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" size="large" onClick={onSubmit}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;

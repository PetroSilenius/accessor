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
  InputAdornment,
  TextField,
  RadioGroup,
  Radio,
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
  card: {
    minWidth: 735,
    minHeight: 610,
  },
  flexRow: {
    flexDirection: 'row',
  },
}));

function Profile() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const peripheralsRef = firestore.collection('peripherals');
  const [peripherals] = useCollectionData(peripheralsRef);

  const [role, setRole] = useState(false);
  const [selectedPeripherals, setSelectedPeripherals] = useState({ 1: false, 2: false, 3: false });
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const userRef = firestore.doc(`users/${user?.uid}`);
    userRef
      .get()
      .then((doc) => {
        const data = doc.data();
        if (data) {
          setRole(data?.auditor);
          setSelectedPeripherals(data?.peripherals);
          setDescription(data?.description);
          setCompany(data?.company);
          setRate(data?.hourlyRate);
        }
      })
      .catch((error) => console.log(error));
  }, [user?.uid]);

  const roleOnChange = (event) => {
    setRole(event.target.value === 'true');
  };
  const peripheralsOnChange = (event) => {
    setSelectedPeripherals({ ...selectedPeripherals, [event.target.id]: event.target.checked });
  };
  const descriptionOnChange = (event) => {
    setDescription(event.target.value);
  };
  const companyOnChange = (event) => {
    setCompany(event.target.value);
  };
  const rateOnChange = (event) => {
    setRate(event.target.value);
  };

  const onSubmit = () => {
    const userRef = firestore.doc(`users/${user?.uid}`);
    userRef.set({
      auditor: role,
      peripherals: selectedPeripherals,
      description: description,
      company: company,
      hourlyRate: rate,
    });
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
                      <h1>{t('user_info.your_info')}</h1>
                    </Grid>
                    <Grid item xs={12}>
                      <img src={user.photoURL} alt={`${user.displayName} profile`} />
                      <p>{user.displayName}</p>
                      <p>{user.email}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">{t('user_info.role')}</FormLabel>
                        <RadioGroup
                          aria-label="role"
                          name="role"
                          value={role}
                          onChange={roleOnChange}
                          className={classes.flexRow}>
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={t('user_info.auditor')}
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={t('user_info.client')}
                          />
                        </RadioGroup>
                      </FormControl>
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
                      <TextField
                        label={t('user_info.hourly_rate')}
                        value={rate}
                        onChange={rateOnChange}
                        fullWidth
                        InputProps={{
                          startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" size="large" onClick={onSubmit}>
                        {t('user_info.save')}
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

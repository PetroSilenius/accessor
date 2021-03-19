import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import ProfileCard from "./ProfileCard";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight:700
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
  },
  profileImg: {
    width: 100,
    margin: "auto",
  },
  submitButton: {
    margin: 20,
    "& button": {
      float: "right",
    },
  },
}));

const users = [
  {
    name: "Testi",
    company:"Auditor aatu",
    auditor: true,
    hourlyRate: 69,
    rating: 4.5,
    description: "Tiukkaa analyysia",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
  },  {
    name: "Testi",
    company:"Auditors.com",
    auditor: true,
    hourlyRate: 40,
    rating: 1.5,
    description: "Moro moro",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
  },  {
    name: "Testi",
    company:"Auditors.com",
    auditor: true,
    hourlyRate: 40,
    rating: 1.5,
    description: "Moro moro",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
  },  {
    name: "Testi",
    company:"Auditors.com",
    auditor: true,
    hourlyRate: 40,
    rating: 1.5,
    description: "Moro moro",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
  },  {
    name: "Testi",
    company:"Auditors.com",
    auditor: true,
    hourlyRate: 40,
    rating: 1.5,
    description: "Moro moro",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
  },  {
    name: "Testi",
    company:"Auditors.com",
    auditor: true,
    hourlyRate: 40,
    rating: 1.5,
    description: "Moro moro",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
  },
];

export default function AuditorListing() {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <div className={classes.container}>
      <Container maxWidth="md" style={{padding:5}}>
	  	<Paper style={{marginBottom:20}}>
        <Grid item xs={12}>
            <Typography variant="h4" style={{textAlign:"center", padding:20}}>{t('auditor_listing.header')}</Typography>
        </Grid>
		  </Paper>
        <Grid container spacing={3} justify="space-evenly">
          {users.map((user) => (
            (user.auditor)?<ProfileCard user={user} />:undefined
          ))}
        </Grid>
      </Container>
    </div>
  );
}

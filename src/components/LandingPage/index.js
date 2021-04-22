import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "calc(100vh)",
  },
  header: {
    fontSize: 60,
  },
  card: {
    padding: 25,
    paddingLeft: 50,
    paddingRight: 50,
    minHeight: 148,
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => {
        console.log("logged in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ margin: 0 }}
        >
          <Grid item xs={12} style={{ marginTop: 50 }}>
            <Card variant="outlined" className={classes.card}>
              <CardContent alignItems="center">
                <Grid container justify="center" alignItems="center">
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {t("landing_page.header")}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" className={classes.card}>
              <CardContent alignItems="center">
                <Grid container justify="center" alignItems="center">
                  <Typography style={{ textAlign: "center" }}>
                    {t("landing_page.description")}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" className={classes.card}>
              <CardActionArea onClick={signInWithGoogle}>
                <CardContent alignItems="center">
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      <Typography variant="h6" style={{ textAlign: "center" }}>
                        {t("landing_page.poster_button")}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" className={classes.card}>
              <CardActionArea onClick={signInWithGoogle}>
                <CardContent alignItems="center">
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      <Typography variant="h6" style={{ textAlign: "center" }}>
                        {t("landing_page.evaluator_button")}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LandingPage;

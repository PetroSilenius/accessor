import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
    paddingRigth: 50,
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

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
              <CardActionArea>
                <CardContent alignItems="center">
                  <Grid container justify="center" alignItems="center">
                    <Typography
                      variant="h6"
                      style={{
                        paddingLeft: 100,
                        paddingRight: 100,
                        textAlign: "center",
                      }}
                    >
                      {t("landing_page.poster_button")}
                    </Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" className={classes.card}>
              <CardActionArea>
                <CardContent alignItems="center">
                  <Grid container justify="center" alignItems="center">
                    <Typography
                      variant="h6"
                      style={{
                        paddingLeft: 100,
                        paddingRight: 100,
                        textAlign: "center",
                      }}
                    >
                      {t("landing_page.evaluator_button")}
                    </Typography>
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

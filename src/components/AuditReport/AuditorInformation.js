import { Card, CardContent, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
  },
}));

function AuditorInformation({ user }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={10}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <h1>{t("audit_report.header")}</h1>
            <h2>{t("user_info.header")}</h2>
            <p>{user?.company}</p>
            <p>{user?.language}</p>
            <p>{user?.description}</p>
            <Link href="#" color="error">
              <b>{t("audit_report.contact")}</b>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AuditorInformation;

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Box,
  Typography,
} from "@material-ui/core";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import { useTranslation } from "react-i18next";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Page from "./Page";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: theme.backgroundImage,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  card: {
    backgroundColor: theme.palette.secondary.lighter,
  },
  submitButton: {
    margin: 20,
    "& button": {
      float: "right",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


function AuditForm() {
  const { t } = useTranslation();
  const classes = useStyles();
  const auditsRef = firestore.collection("audits").doc();
  const questionsRef = firestore.collection("questions");
  const [questions] = useCollectionData(questionsRef.orderBy("id").limit(25), {
    idField: "id",
  });
  const usersRef = firestore.collection("users");
  const [user] = useCollectionData(usersRef.orderBy("id").limit(1), {
    idField: "id",
  });
  const [checkedPeripherals, setCheckedPeripherals] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [pages, setPages] = useState([{ }]);


  const submitForm = async (e) => {
    e.preventDefault();
    let auditData = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user,
    };
    let auditPageData = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    auditsRef
      .set(auditData)
      .then(() => {
        console.log(auditData, "successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    pages.forEach((page)=>{
      auditsRef
      .collection("pages")
      .add(page)
      .then(() => {
        console.log(auditPageData, "successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    })
    return false;
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <form name="page_audit" onSubmit={submitForm}>
          <Grid container spacing={1} justify="center">
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardContent>
                  <h1>{t("audit_form.header")}</h1>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardContent>
                  <Tabs
                    value={activeTab}
                    onChange={(e, n) => {
                      setActiveTab(n);
                    }}
                    aria-label="simple tabs example"
                  >
                    {pages.map((page, idx) => (
                      <Tab label={t('audit_form.page')+(idx+1)} {...a11yProps(idx)} />
                    ))}
                    <Tab
                      label={t('audit_form.add_page')}
                      onClick={() => {
                        var arr = [...pages];
                        arr.push({ });
                        setPages(arr);
                      }}
                      {...a11yProps(pages.length)}
                    />
                  </Tabs>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={10}>
            {pages.map((page, id) => (
              <Grid item xs={12}>
                <TabPanel value={activeTab} index={id}>
                  <Page id={id} checkedPeripherals={checkedPeripherals} questions={questions} setPages={setPages} pages={pages} />
                </TabPanel>
              </Grid>
            ))}
            </Grid>
            <Grid item xs={10} className={classes.submitButton}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                {t("audit_form.submit")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default AuditForm;

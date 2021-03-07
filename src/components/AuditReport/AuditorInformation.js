import { Card, CardContent, CardActions, Grid, Link, Typography } from '@material-ui/core';

function AuditorInformation({ user }) {
  return (
    <Grid container justify="center">
      <Grid item xs="10">
        <Card variant="outlined">
          <CardContent>
            <Typography>{user?.company}</Typography>
            <Typography>{user?.language}</Typography>
            <Typography>{user?.disabilities}</Typography>
            <Typography>{user?.description}</Typography>
          </CardContent>
          <CardActions>
            <Link color="inherit">Contact auditor</Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AuditorInformation;

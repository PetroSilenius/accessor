import { Grid, TextField } from '@material-ui/core';

function AuditForm() {
  return (
    <form>
      <Grid item>
        <h1>Audit form</h1>
        <TextField required id="pageUrl" name="pageUrl" label="Page url" fullWidth />
      </Grid>
    </form>
  );
}

export default AuditForm;

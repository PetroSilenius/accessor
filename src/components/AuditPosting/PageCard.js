import { Grid, Card, CardContent, TextField } from '@material-ui/core';

const PageCard = ({ index, pageUrl, description, onChange }) => {
  return (
    <Grid item xs={10}>
      <Card variant="outlined">
        <CardContent>
          <p>{pageUrl}</p>
          <p>{description}</p>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                name={`pageUrl-${index}`}
                label={'Page url'}
                value={pageUrl}
                variant="outlined"
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name={`description-${index}`}
                label={'Description'}
                value={description}
                multiline
                rows={2}
                variant="outlined"
                onChange={onChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PageCard;

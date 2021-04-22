import { Grid, Card, CardContent, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const PageCard = ({ index, pageUrl, description, onChange }) => {
  const { t } = useTranslation();
  return (
    <Grid item xs={10}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>{t('audit_posting.subpage_header')}</h2>
              <TextField
                required
                name={`pageUrl-${index}`}
                label={t('audit_posting.input_subpage_url')}
                value={pageUrl}
                variant="outlined"
                onChange={onChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <p>{t('audit_posting.subpage_desc')}</p>
              <TextField
                required
                name={`description-${index}`}
                label={t('audit_posting.input_description')}
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

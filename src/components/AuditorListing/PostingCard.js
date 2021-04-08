import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PostingCard({ posting, poster = false }) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">{posting.pageUrl}</Typography>
          <Typography>{posting.description}</Typography>
          <Typography>
            {t('auditor_listing.page_amount')}
            {Object.keys(posting.pages).length}
          </Typography>
          {poster ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/report/${posting.id}`)}>
              {t('audit_report.header')}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/audit/${posting.id}`)}>
              {t('top_bar.audit')}
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostingCard;

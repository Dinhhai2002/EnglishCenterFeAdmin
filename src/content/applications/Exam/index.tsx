import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';
import UploadAudio from './UploadAudio';
import UploadQuestion from './UploadQuestion';
import { useState } from 'react';

function ApplicationsExam() {
  const [changeData, setChangeData] = useState(false);
  return (
    <>
      <Helmet>
        <title>Quản lí đề thi</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <PageHeader setChangeData={setChangeData} changeData={changeData} />
          <UploadAudio setChangeData={setChangeData} changeData={changeData} />
          <UploadQuestion setChangeData={setChangeData} changeData={changeData} />
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders changeData={changeData} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsExam;

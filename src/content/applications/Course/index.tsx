import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';
import UploadBanner from './UploadBanner';
import AddChapter from './AddChapter';
import { useState } from 'react';

function ApplicationsCourse() {
  const [changeData, setChangeData] = useState(false);
  return (
    <>
      <Helmet>
        <title>Quản lí Khóa học</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <PageHeader setChangeData={setChangeData} changeData={changeData} />
          <UploadBanner setChangeData={setChangeData} changeData={changeData} />
          {/* <AddChapter /> */}
        </Grid>
      </PageTitleWrapper>
      <PageTitleWrapper></PageTitleWrapper>
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

export default ApplicationsCourse;

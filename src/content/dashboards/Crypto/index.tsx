import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

import { useEffect, useState } from 'react';
import adminApiService from 'src/services/API/Admin/AdminApiService';
import AppWidgetSummary from './AppWidgetSummary';
import RecentOrdersTableExam from './RecentOrdersTableExam';
import RecentOrdersTablePayment from './RecentOrdersTablePayment';

function DashboardCrypto() {
  const [statistical, setStatistical] = useState<any>({});

  const chartData: any = [
    {
      id: 1,
      label: '',
      data: [5, 6, 7]
    },
    {
      id: 2,
      label: '',
      data: [3, 2, 1]
    }
  ];

  useEffect(() => {
    adminApiService
      .countStatistical()
      .then((data: any) => {
        setStatistical(data.data);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>English Center</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          sx={{ marginBottom: 5 }}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tổng số người dùng"
              total={statistical ? statistical.count_user : 0}
              icon={'ant-design:android-filled'}
              sx
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tổng số khóa học"
              total={statistical ? statistical.count_course : 0}
              color="info"
              icon={'ant-design:apple-filled'}
              sx
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tổng số đề thi"
              total={statistical ? statistical.count_exam : 0}
              color="warning"
              icon={'ant-design:windows-filled'}
              sx
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tổng số doanh thu"
              total={statistical ? statistical.total_amount : 0}
              color="error"
              icon={'ant-design:bug-filled'}
              sx
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ marginBottom: 5 }}>
        <Grid sx={{ marginBottom: 5 }} item xs={12}>
          <RecentOrdersTableExam />
        </Grid>
        <Grid item xs={12}>
          <RecentOrdersTablePayment />
        </Grid>
      </Container>
      {/* <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
          <Grid item xs={12}>
            <Chart type="line" data={chartData} />
          </Grid>
        </Grid>
      </Container> */}
      <Footer />
    </>
  );
}

export default DashboardCrypto;

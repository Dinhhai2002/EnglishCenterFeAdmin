import classNames from 'classnames/bind';
import styles from './StatisticalResult.module.scss';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Navbar from './Navbar';

const cx = classNames.bind(styles);

function StatisticalNumberDoExam() {
  return (
    <>
      <PageTitleWrapper>
        <h3>Thống kê đề thi</h3>
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
            <Navbar />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default StatisticalNumberDoExam;

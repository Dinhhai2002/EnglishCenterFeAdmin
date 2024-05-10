import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Feed from './Feed';
import PopularTags from './PopularTags';
import MyCards from './MyCards';
import Addresses from './Addresses';
import { useEffect, useState } from 'react';
import userApiService from 'src/services/API/UserApiService';

function ManagementUserProfile() {
  // const [currentUser, setCurrentUser] = useState<any>({});

  // useEffect(() => {
  //   userApiService
  //     .getUser()
  //     .then((data: any) => {
  //       setCurrentUser(data.data);
  //     })
  //     .catch((error: any) => {});
  // }, []);

  return (
    <>
      <Helmet>
        <title>Trang cá nhân</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <ProfileCover />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;

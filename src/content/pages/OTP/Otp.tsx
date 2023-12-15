import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Alert, Grid, ThemeProvider } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import authenticationApiService from 'src/services/API/AuthenticationApiService';
import styles from './Otp.module.scss';
import { theme } from 'src/components/CustomMui/CustomMui';

const cx = classNames.bind(styles);

export default function OTP() {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const username = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '';
    const email = localStorage.getItem('email')
      ? localStorage.getItem('email')
      : '';
    const type = localStorage.getItem('typeOtp')
      ? localStorage.getItem('typeOtp')
      : '';

    authenticationApiService
      .confirmOtp(username, email, Number(data.get('otp')), Number(type))
      .then((data: any) => {
        navigate('/reset-password');
      })
      .catch((error: any) => {
        setLoading(false);
        setIsError(true);
        setError(`${error.message}`);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          sx={{
            width: '100%',
            marginTop: 10,
            display: 'flex',

            justifyContent: 'center'
          }}
        >
          <Box
            className={cx('box')}
            sx={{
              width: '50%',
              height: '70%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2
            }}
          >
            <Link to={'/'}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
            </Link>
            <Typography component="h1" variant="h5">
              Mã OTP
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {isError && <Alert severity="error">{error}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoComplete="email"
                autoFocus
              />

              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </LoadingButton>
              <Grid
                container
                sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
              >
                <Grid item xs>
                  <Link className={cx('link')} to={'/login'}>
                    Đã có tài khoản?Đăng nhập
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

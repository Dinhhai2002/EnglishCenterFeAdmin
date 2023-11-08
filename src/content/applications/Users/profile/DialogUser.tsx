import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userApiService from 'src/services/API/UserApiService';
function DialogUser({ user }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [fullName, setFullName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [fullAddress, setFullAddress] = useState(user.full_address);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // xử lí trường hợp đầu tiên user rỗng
  useEffect(() => {
    setFullName(user.full_name);
    setEmail(user.email);
    setPhone(user.phone);
    setFullAddress(user.full_address);
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    userApiService
      .update(fullName, email, phone, fullAddress)
      .then((data: any) => {
        setOpen(false);
        toast.success(`Chỉnh sửa thành công`, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch((error: any) => {
        setIsError(true);
        SetError(error.message);
      });
  };

  return (
    <>
      <Button size="medium" variant="contained" onClick={handleClickOpen}>
        Cập nhật thông tin
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }} id="responsive-dialog-title">
          Thông tin người dùng
        </DialogTitle>
        {isError && <Alert severity="error">{error}</Alert>}
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên người dùng"
              name="fullName"
              autoComplete="username"
              autoFocus
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ marginTop: 4 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Số điện thoại"
              name="phone"
              autoComplete="phone"
              autoFocus
              sx={{ marginTop: 4 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Địa chỉ"
              name="address"
              autoComplete="username"
              autoFocus
              sx={{ marginTop: 4 }}
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
            />

            <DialogActions>
              <Button variant="outlined" autoFocus onClick={handleClose}>
                Thoát
              </Button>
              <Button variant="outlined" type="submit" autoFocus>
                Cập nhật
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogUser;

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
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
  useTheme,
  Zoom
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInput from 'src/components/FormReact/FormInput';
import userApiService from 'src/services/API/UserApiService';
import { EditSuccess } from 'src/utils/MessageToast';
import { ValidateInput, validateSchema } from './ValidateFormUser';

function DialogUser({ user, changeData, setChangeData }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const { handleSubmit } = methods;
  console.log(123);

  const onSubmitHandler: SubmitHandler<ValidateInput> = (values: any) => {
    setLoading(true);
    if (
      user.full_name === values.fullName &&
      user.email === values.email &&
      user.phone === values.phone &&
      user.full_address === values.address
    ) {
      setLoading(false);
      return;
    }

    userApiService
      .update(values.fullName, values.email, values.phone, values.address)
      .then((data: any) => {
        setOpen(false);
        toast.success(EditSuccess);
        setLoading(false);
        setChangeData(!changeData);
      })
      .catch((error: any) => {
        setIsError(true);
        SetError(error.message);
        setLoading(false);
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
        TransitionComponent={Zoom}
        transitionDuration={600}
      >
        <DialogTitle sx={{ fontWeight: 700 }} id="responsive-dialog-title">
          Thông tin người dùng
        </DialogTitle>
        {isError && <Alert severity="error">{error}</Alert>}
        <FormProvider {...methods}>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormInput
                type="text"
                name="fullName"
                defaultValue={user.full_name}
                required
                fullWidth
                label="Tên người dùng"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="text"
                name="email"
                defaultValue={user.email}
                required
                fullWidth
                label="email"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="text"
                name="phone"
                defaultValue={user.phone}
                required
                fullWidth
                label="Số điện thoại"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="text"
                name="address"
                defaultValue={user.full_address}
                required
                fullWidth
                label="Địa chỉ"
                sx={{ mb: 2 }}
              />

              <DialogActions>
                <Button variant="outlined" autoFocus onClick={handleClose}>
                  Thoát
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="outlined"
                  type="submit"
                  autoFocus
                >
                  Cập nhật
                </LoadingButton>
              </DialogActions>
            </Box>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </>
  );
}

export default DialogUser;

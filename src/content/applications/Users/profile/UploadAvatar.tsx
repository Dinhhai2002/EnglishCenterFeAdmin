import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
  Zoom
} from '@mui/material';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { toast } from 'react-toastify';
import userApiService from 'src/services/API/UserApiService';
import { UploadSuccess } from 'src/utils/MessageToast';
import Image from 'src/components/Image/Image';

function DialogAvatar({ changeData, setChangeData }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUrl('');
  };

  const handleChangeFile = (e: any) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setUrl(imageUrl);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const fileData: any = data.get('file');

    if (!fileData || fileData['name'] === '') {
      setIsError(true);
      SetError('Bạn chưa nhập file hoặc file không hợp lệ!');
      setLoading(false);
      return;
    }

    userApiService
      .uploadAvatar(data.get('file'))
      .then((data: any) => {
        setOpen(false);
        setChangeData(!changeData);
        toast.success(UploadSuccess);
        setLoading(false);
      })
      .catch((error: any) => {
        setIsError(true);
        SetError(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <IconButton component="span" color="primary">
        <UploadTwoToneIcon onClick={handleClickOpen} />
      </IconButton>
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
          Cập nhật avatar
        </DialogTitle>
        {isError && <Alert severity="error">{error}</Alert>}
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                sx={{ marginTop: 4, marginBottom: 2, minWidth: 120 }}
                name="file"
                type="file"
                onChange={handleChangeFile}
              />
              {url !== '' && <Image width="200px" height="200px" src={url} />}
            </Box>

            <DialogActions>
              <LoadingButton variant="outlined" autoFocus onClick={handleClose}>
                Thoát
              </LoadingButton>
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
      </Dialog>
    </>
  );
}

export default DialogAvatar;

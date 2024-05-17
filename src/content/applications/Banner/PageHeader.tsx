import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'src/components/Image/Image';
import bannerApiService from 'src/services/API/BannerApiService';
import { ValidateInput, validateSchema } from './ValidateFormPost';
import { CreateSuccess } from 'src/utils/MessageToast';

function PageHeader({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setUrl(imageUrl);
  };

  useEffect(() => {}, []);

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const { handleSubmit, reset } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = async (values: any) => {
    setLoading(true);
    if (url == '') {
      toast.error('Vui lòng chọn banner cho bài viết này!');
      setLoading(false);
      return;
    }
    const dataUploadBanner = await bannerApiService.create(file);

    toast.success(CreateSuccess);
    setChangeData(!changeData);
    setLoading(false);
    reset();
    setUrl('');
    handleClose();
  };

  return (
    <>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Thêm mới Banner
        </Button>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        TransitionComponent={Slide}
        transitionDuration={600}
      >
        <DialogTitle
          sx={{ fontWeight: 600, fontSize: 20 }}
          id="responsive-dialog-title"
        >
          Tạo Banner
        </DialogTitle>
        <FormProvider {...methods}>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  sx={{
                    marginTop: 4,
                    marginBottom: 2,
                    minWidth: 120,
                    marginRight: 2
                  }}
                  name="file"
                  type="file"
                  onChange={handleChangeFile}
                />
                {url !== '' && <Image width="400px" height="200px" src={url} />}
              </Box>

              <DialogActions sx={{ marginTop: 2 }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                >
                  Submit
                </LoadingButton>
                <Button autoFocus onClick={handleClose} variant="outlined">
                  Thoát
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </>
  );
}

export default PageHeader;

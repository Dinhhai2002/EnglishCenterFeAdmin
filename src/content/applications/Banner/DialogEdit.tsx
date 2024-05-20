import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useContext, useLayoutEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInput from 'src/components/FormReact/FormInput';
import bannerApiService from 'src/services/API/BannerApiService';
import postApiService from 'src/services/API/PostApiService';
import { EditSuccess } from 'src/utils/MessageToast';
import ChapterContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormPost';
import Image from 'src/components/Image/Image';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit, item }) {
  const [banner, setBanner] = useState<any>(item);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState({});

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const chapterContext = useContext(ChapterContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    bannerApiService
      .findOne(id)
      .then((data) => {
        setBanner(data.data);
        setUrl(data.data.url);
      })
      .catch((error: any) => {});
  }, []);

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setUrl(imageUrl);
  };

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset
  } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = async (values: any) => {
    setLoading(true);
    if (url == banner.url) {
      toast.error('Vui lòng chọn banner cho bài viết này!');
      setLoading(false);
      return;
    }
    const data = await bannerApiService.update(id, file);
    toast.success(EditSuccess);
    handleCloseEdit(id);
    setLoading(false);
    chapterContext.onChangeValue();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialogMapEdit[id] || false}
      onClose={() => {
        handleCloseEdit(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Slide}
      transitionDuration={600}
    >
      <DialogTitle
        sx={{ fontWeight: 600, fontSize: 20 }}
        id="responsive-dialog-title"
      >
        Thông tin chi tiết Blog
      </DialogTitle>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          autoComplete="off"
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                reset();
                handleCloseEdit(id);
              }}
              variant="outlined"
            >
              Thoát
            </Button>
            <LoadingButton
              loading={loading}
              type="submit"
              autoFocus
              variant="outlined"
            >
              cập nhật
            </LoadingButton>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
}

export default DialogEdit;

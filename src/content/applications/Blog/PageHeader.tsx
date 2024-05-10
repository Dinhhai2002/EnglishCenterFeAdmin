import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SelectChangeEvent,
  Slide,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DropDown from 'src/components/DropDown/DropDown';
import FormInput from 'src/components/FormReact/FormInput';
import Image from 'src/components/Image/Image';
import authenticationApiService from 'src/services/API/AuthenticationApiService';
import postApiService from 'src/services/API/PostApiService';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { StatusPostEnum } from 'src/utils/enum/StatusPostEnum';
import { config } from './Config';
import { ValidateInput, validateSchema } from './ValidateFormPost';

function PageHeader({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('<p>Hello from English Center!</p>');
  const [categoryBlogId, setCategoryBlogId] = useState('');
  const [listCategoryBlog, setListCategoryBlog] = useState([]);
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

  const handleChangeCategoryBlogId = (event: SelectChangeEvent) => {
    setCategoryBlogId(event.target.value);
  };

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setUrl(imageUrl);
  };

  useEffect(() => {
    authenticationApiService
      .getAllCategoryBlog(StatusEnum.ON)
      .then((data: any) => {
        setListCategoryBlog(data.data);
      })
      .catch((error: any) => {});
  }, []);

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const { handleSubmit, reset } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = async (values: any) => {
    setLoading(true);

    if (Number(categoryBlogId) < 1) {
      toast.error('Vui lòng chọn danh mục bài viết!');
      setLoading(false);
      return;
    }
    if (value == '') {
      toast.error('nội dung bài viết không được trống!');
      setLoading(false);
      return;
    }

    if (url == '') {
      toast.error('Vui lòng chọn banner cho bài viết này!');
      setLoading(false);
      return;
    }
    const data = await postApiService.create(
      values.title,
      values.description,
      value,
      Number(categoryBlogId),
      StatusPostEnum.PENDING
    );

    const dataUploadBanner = await postApiService.uploadBanner(
      Number(data.data.id),
      file
    );

    toast.info(`Bài viết tạo thành công.Vui lòng chờ admin duyệt bài!`);
    setLoading(false);
    reset();
    setUrl('');
    setCategoryBlogId('');
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
          Thêm mới Blog
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
          Tạo Blog
        </DialogTitle>
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
                name="title"
                defaultValue={''}
                required
                fullWidth
                label="title"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="text"
                name="description"
                defaultValue={''}
                required
                fullWidth
                label="description"
                sx={{ mb: 2 }}
              />

              <DropDown
                isMargin={true}
                value={categoryBlogId}
                onChange={handleChangeCategoryBlogId}
                listValue={listCategoryBlog}
                label="Danh mục bài viết"
              />
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
              <CKEditor
                config={config}
                editor={ClassicEditor}
                data={value}
                onReady={(editor: any) => {}}
                onChange={(event: any, editor: any) => {
                  setValue(editor.getData());
                }}
                onBlur={(event: any, editor: any) => {}}
                onFocus={(event: any, editor: any) => {}}
              />
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

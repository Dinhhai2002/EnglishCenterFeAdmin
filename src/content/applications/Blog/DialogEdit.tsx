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
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useContext, useLayoutEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInput from 'src/components/FormReact/FormInput';
import postApiService from 'src/services/API/PostApiService';
import { EditSuccess } from 'src/utils/MessageToast';
import { config } from './Config';
import ChapterContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormPost';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit, item }) {
  const [post, setPost] = useState<any>(item);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const chapterContext = useContext(ChapterContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    postApiService
      .findOne(id)
      .then((data) => {
        setPost(data.data);
        setValue(data.data.content);
      })
      .catch((error: any) => {});
  }, []);

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
    const data = await postApiService.update(
      id,
      values.title,
      values.description,
      value,
      post.category_blog_id,
      post.status
    );
    toast.success(EditSuccess);
    setPost(data.data);
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
            <FormInput
              type="text"
              name="title"
              defaultValue={post.title}
              required
              fullWidth
              label="Tên title Blog"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="description"
              defaultValue={post.description}
              required
              fullWidth
              label="Mô tả"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="categoryBlog"
              defaultValue={post.category_blog_name}
              required
              disabled
              fullWidth
              label="Danh mục blog"
              sx={{ mb: 2 }}
            />

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

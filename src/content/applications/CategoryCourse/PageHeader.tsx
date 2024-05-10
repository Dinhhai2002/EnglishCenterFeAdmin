import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import FormInput from 'src/components/FormReact/FormInput';
import { ValidateInput, validateSchema } from './ValidateFormEdit';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import categoryExamAdminApiService from 'src/services/API/Admin/CategoryExamAdminApiService';
import { CreateSuccess } from 'src/utils/MessageToast';
import { toast } from 'react-toastify';
import categoryCourseAdminApiService from 'src/services/API/Admin/CategoryCourseAdminApiService';

function PageHeader({ setChangeData, changeData }) {
  const [open, setOpen] = useState(false);
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
  const {
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit
  } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = (values: any) => {
    setLoading(true);

    categoryCourseAdminApiService
      .create(values.name, values.description)
      .then((data: any) => {
        setOpen(false);
        toast.success(CreateSuccess);
        setChangeData(!changeData);
        setLoading(false);
        reset();
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item></Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Thêm mới danh mục khóa học
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
          Thêm mới danh mục khóa học
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
                name="name"
                defaultValue={''}
                required
                fullWidth
                label="Tên danh mục khóa học"
                sx={{ mb: 2 }}
              />
              <FormInput
                type="text"
                name="description"
                defaultValue={''}
                required
                multiline
                fullWidth
                label="Mô tả"
                sx={{ mb: 2 }}
              />
              <DialogActions>
                <Button variant="outlined" autoFocus onClick={handleClose}>
                  Thoát
                </Button>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  autoFocus
                  variant="outlined"
                >
                  Tạo mới
                </LoadingButton>
              </DialogActions>
            </Box>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </Grid>
  );
}

export default PageHeader;

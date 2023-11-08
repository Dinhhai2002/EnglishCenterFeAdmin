import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import { ValidateInput, validateSchema } from './ValidateFormCourse';
import FormInput from 'src/components/FormReact/FormInput';
import courseAdminApiService from 'src/services/API/Admin/CourseAdminApiService';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { CreateSuccess } from 'src/utils/MessageToast';

function PageHeader({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [isFree, setIsFree] = useState('1');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeIsFree = (event: SelectChangeEvent) => {
    setIsFree(event.target.value);
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

    courseAdminApiService
      .create(
        values.name,
        values.description,
        Number(values.price),
        Number(isFree)
      )
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
    <>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Thêm mới khóa học
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
        <DialogTitle sx={{ fontWeight: 700 }} id="responsive-dialog-title">
          Thêm mới khóa học
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
                label="Tên khóa học"
                sx={{ mb: 2 }}
              />
              <FormInput
                type="text"
                name="description"
                defaultValue={''}
                multiline
                required
                fullWidth
                label="Mô tả"
                sx={{ mb: 2 }}
              />

              <Box sx={{ marginTop: 2, marginBottom: 2, minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Hình thức khóa học
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isFree}
                    label="Hình thức khóa học"
                    onChange={handleChangeIsFree}
                  >
                    <MenuItem value={0}>Có phí</MenuItem>
                    <MenuItem value={1}>Miễn phí</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {isFree == '0' && (
                <FormInput
                  type="number"
                  name="price"
                  defaultValue={'0'}
                  required
                  fullWidth
                  label="Giá tiền"
                  sx={{ mb: 2 }}
                />
              )}
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
                  Tạo mới khóa học
                </LoadingButton>
              </DialogActions>
            </Box>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </>
  );
}

export default PageHeader;

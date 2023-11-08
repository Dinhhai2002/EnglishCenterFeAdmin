import {
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
  useMediaQuery,
  useTheme
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormInputDropdown } from 'src/components/FormReact/FormDropdown';
import FormInput from 'src/components/FormReact/FormInput';
import examAdminApiService from 'src/services/API/Admin/ExamAdminApiService';
import categoryExamApiService from 'src/services/API/CategoryExamApiService';
import { CreateSuccess } from 'src/utils/MessageToast';
import { ValidateInput, validateSchema } from './ValidateFormCreateExam';

function PageHeader({ setChangeData, changeData }) {
  const [open, setOpen] = useState(false);
  const [listTopic, setListTopic] = useState([]);
  const [listCategoryExam, setListCategoryExam] = useState([]);
  const [categoryExam, setCategoryExam] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    categoryExamApiService
      .getAll()
      .then((data: any) => {
        setListCategoryExam(data.data);
      })
      .catch((error: any) => {});
  }, []);

  const handleChangeCategoryExam = (event: SelectChangeEvent) => {
    setCategoryExam(event.target.value);
  };

  useEffect(() => {
    categoryExamApiService
      .getAllTopicById(Number(categoryExam))
      .then((data: any) => {
        setListTopic(data.data);
      })
      .catch((error: any) => {});
  }, [categoryExam]);

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset
  } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = (values: any) => {
    setLoading(true);

    examAdminApiService
      .create(
        values.name,
        values.description,
        Number(categoryExam),
        Number(values.topic),
        Number(values.time),
        Number(values.question)
      )
      .then((data: any) => {
        /**
         * Đóng model
         * toast message
         * truyền sự kiện để render lại danh sách mới
         * reset form
         */
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
          Thêm mới đề thi
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
          Thêm mới đề thi
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
                label="Tên đề thi"
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
                  <InputLabel required id="demo-simple-select-label">
                    Danh mục đề thi
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryExam}
                    label="Danh mục đề thi"
                    onChange={handleChangeCategoryExam}
                  >
                    {listCategoryExam.map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <FormInputDropdown
                name="topic"
                defaultValue={''}
                arr={listTopic}
                required
                fullWidth
                label="Topic đề thi"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="number"
                name="time"
                defaultValue={''}
                required
                fullWidth
                label="Tổng số thời gian"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="number"
                name="question"
                defaultValue={''}
                required
                fullWidth
                label="Tổng số câu hỏi"
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
                  Tạo mới đề thi
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

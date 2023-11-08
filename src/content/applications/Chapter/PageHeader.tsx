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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import { FormInputDropdown } from 'src/components/FormReact/FormDropdown';
import FormInput from 'src/components/FormReact/FormInput';
import chapterApiService from 'src/services/API/ChapterApiService';
import courseApiService from 'src/services/API/CourseApiService';
import { ValidateInput, validateSchema } from './ValidateFormCreateChapter';
import { CreateSuccess } from 'src/utils/MessageToast';
import { toast } from 'react-toastify';

function PageHeader({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [listCourse, setListCourse] = useState([]);
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
    courseApiService
      .getAll()
      .then((data: any) => {
        setListCourse(data.data);
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

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ValidateInput> = (values: any) => {
    setLoading(true);
    console.log(values.name, Number(values.course));

    chapterApiService
      .create(values.name, Number(values.course))
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
          Thêm mới chương học
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
          Thêm mới chương học
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
                label="Tên chương học"
                sx={{ mb: 2 }}
              />

              <FormInputDropdown
                name="course"
                defaultValue={''}
                arr={listCourse}
                required
                multiline
                fullWidth
                label="khóa học"
                sx={{ mb: 2 }}
              />

              <DialogActions>
                <Button variant="outlined" autoFocus onClick={handleClose}>
                  Thoát
                </Button>
                <Button variant="outlined" type="submit" autoFocus>
                  Tạo mới chương học
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

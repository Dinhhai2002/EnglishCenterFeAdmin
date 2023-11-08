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
  useMediaQuery,
  useTheme
} from '@mui/material';
import Slide from '@mui/material/Slide';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormInputDropdown } from 'src/components/FormReact/FormDropdown';
import FormInput from 'src/components/FormReact/FormInput';
import chapterApiService from 'src/services/API/ChapterApiService';
import courseApiService from 'src/services/API/CourseApiService';
import lessonsApiService from 'src/services/API/LessonsApiService';
import { CreateSuccess, UrlVideoNoRegulation } from 'src/utils/MessageToast';
import { ValidateInput, validateSchema } from './ValidateFormCreateLessons';
import classNames from 'classnames/bind';
import styles from './Lessons.module.scss';
import { Toast } from 'react-toastify/dist/components';

const cx = classNames.bind(styles);

function PageHeader({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [listChapter, setListChapter] = useState([]);
  const [listCourse, setListCourse] = useState([]);
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [typeVideo, setTypeVideo] = useState('1');

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

  const handleChangeCourse = (event: SelectChangeEvent) => {
    setCourse(event.target.value);
  };

  const handleChangeTypeVideo = (event: SelectChangeEvent) => {
    setTypeVideo(event.target.value);
  };

  useEffect(() => {
    chapterApiService
      .getAll(Number(course), '', -1, 0, 0, 20)
      .then((data: any) => {
        setListChapter(data.data.list);
      })
      .catch((error: any) => {});
  }, [course]);

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
    if (
      Number(typeVideo) === 0 &&
      !values.urlVideo.startsWith('https://www.youtube.com/')
    ) {
      toast.error(UrlVideoNoRegulation);
      setLoading(false);
      return;
    }
    lessonsApiService
      .create(
        values.name,
        values.description,
        values.content,
        Number(typeVideo),
        values.urlVideo,
        Number(course),
        Number(values.chapter),
        0
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
          Thêm mới bài học
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
          Thêm mới bài học
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
                label="Tên bài học"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="text"
                name="description"
                defaultValue={''}
                multiline
                required
                fullWidth
                label="Mô tả bài học"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="text"
                name="content"
                defaultValue={''}
                multiline
                required
                fullWidth
                label="Nội dung bài học"
                sx={{ mb: 2 }}
              />

              <Box sx={{ marginTop: 2, marginBottom: 2, minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Kiểu video bài học
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeVideo}
                    label="Kiểu video bài học"
                    onChange={handleChangeTypeVideo}
                  >
                    <MenuItem value={0}>Đường dẫn Youtube</MenuItem>
                    <MenuItem value={1}>Google Driver</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {typeVideo == '0' && (
                <FormInput
                  type="text"
                  name="urlVideo"
                  defaultValue={''}
                  fullWidth
                  label="Đường dẫn video youtube"
                  sx={{ mb: 2 }}
                />
              )}

              <Box sx={{ marginBottom: 2, minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Khóa học
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={course}
                    label="Khóa học"
                    onChange={handleChangeCourse}
                  >
                    {listCourse.map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <FormInputDropdown
                name="chapter"
                defaultValue={''}
                arr={listChapter}
                required
                fullWidth
                label="Chương học"
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
                  Tạo mới bài học
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

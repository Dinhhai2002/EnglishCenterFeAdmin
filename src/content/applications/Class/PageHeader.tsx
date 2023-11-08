import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  useMediaQuery,
  useTheme,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert
} from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import dayjs from 'dayjs';
import courseApiService from 'src/services/API/CourseApiService';
import classAdminApiService from 'src/services/API/Admin/ClassAdminApiService';
import formatTimeUtils from 'src/utils/FormatTimeUtils';

function PageHeader({ handleCreateClass }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [listCourse, setListCourse] = useState([]);
  const [course, setCourse] = useState('');

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
      .then((data) => {
        setListCourse(data.data);
      })
      .catch((error: any) => {});
  }, []);

  const handleChangeCourse = (event: SelectChangeEvent) => {
    setCourse(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formattedDateStart: string = dayjs(dateStart).format('DD/MM/YYYY');
    const formattedDateEnd: string = dayjs(dateEnd).format('DD/MM/YYYY');
    if (data.get('name') === '') {
      setIsError(true);
      SetError('Tên không được trống!');
      return;
    }
    if (dateStart === '' || dateEnd === '') {
      setIsError(true);
      SetError('Ngày không hợp lệ!');
      return;
    }
    const validateDateStart: any =
      formatTimeUtils.calculateDateTarget(formattedDateStart);
    const validateDateEnd: any =
      formatTimeUtils.calculateDateTarget(formattedDateStart);

    if (validateDateStart < 0 || validateDateEnd < 0) {
      setIsError(true);
      SetError('Ngày nhập vào phải lớn hơn ngày hiện tại');
      return;
    }

    if (course === '' && dateStart !== '' && dateEnd !== '') {
      setIsError(true);
      SetError('Vui lòng chọn khóa học!');
      return;
    }
    classAdminApiService
      .create(
        data.get('name'),
        formattedDateStart,
        formattedDateEnd,
        Number(course)
      )
      .then((data: any) => {
        setOpen(false);
        window.location.reload();
      })
      .catch((error: any) => {
        setIsError(true);
        SetError(error.message);
      });
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
          disableRipple
          component={RouterLink}
          to="/management/class/add-student"
        >
          Thêm sinh viên vào lớp học
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Thêm mới lớp học
        </Button>
      </Grid>

      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
          disableRipple
          component={RouterLink}
          to="/management/class/add-teacher"
        >
          Thêm giáo viên vào lớp học
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
          disableRipple
          component={RouterLink}
          to="/management/class/add-weekday"
        >
          Thêm lịch học
        </Button>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title">Thêm mới lớp học</DialogTitle>
        {isError && <Alert severity="error">{error}</Alert>}
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên khóa học"
              name="name"
              autoComplete="username"
              autoFocus
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Chọn ngày bắt đầu"
                  value={dateStart}
                  onChange={(newValue: any) => setDateStart(newValue)}
                  views={['year', 'month', 'day']}
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Chọn ngày kết thúc"
                  value={dateEnd}
                  onChange={(newValue: any) => setDateEnd(newValue)}
                  views={['year', 'month', 'day']}
                />
              </DemoContainer>
            </LocalizationProvider>

            <Box sx={{ marginTop: 4, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Khóa học</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={course}
                  label="Khóa học"
                  onChange={handleChangeCourse}
                >
                  {listCourse.map((course: any) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <DialogActions>
              <Button variant="outlined" autoFocus onClick={handleClose}>
                Thoát
              </Button>
              <Button variant="outlined" type="submit" autoFocus>
                Tạo lớp học
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default PageHeader;

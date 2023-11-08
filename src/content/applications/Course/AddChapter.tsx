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
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import courseApiService from 'src/services/API/CourseApiService';
import courseAdminApiService from 'src/services/API/Admin/CourseAdminApiService';
import chapterApiService from 'src/services/API/ChapterApiService';
import { toast } from 'react-toastify';

function AddChapter({ handleCreateClass }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [listCourse, setListCourse] = useState([]);
  const [course, setCourse] = useState('');
  const [chapterName, setChapterName] = useState('');

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

    if (chapterName == '') {
      setIsError(true);
      SetError('Bạn chưa nhập file!');
      return;
    }

    chapterApiService
      .create(chapterName, Number(course))
      .then((data: any) => {
        setOpen(false);
        toast.success(`Thêm thành công!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
      .catch((error: any) => {});
  };

  return (
    // <Grid container justifyContent="space-between" alignItems="center">
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
      >
        <DialogTitle sx={{ fontWeight: 700 }} id="responsive-dialog-title">
          Thêm mới chương học
        </DialogTitle>
        {isError && <Alert severity="error">{error}</Alert>}
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={chapterName === ''}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên chương học"
              name="name"
              autoComplete="username"
              autoFocus
              value={chapterName}
              onChange={(e) => {
                setChapterName(e.target.value);
              }}
            />

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
                Tạo mới
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddChapter;

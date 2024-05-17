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
import { toast } from 'react-toastify';
import { UploadSuccess } from 'src/utils/MessageToast';
import { LoadingButton } from '@mui/lab';

function UploadBanner({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [listCourse, setListCourse] = useState([]);
  const [course, setCourse] = useState('');
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
      .getAllNoBanner()
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
    setLoading(true);
    const data = new FormData(event.currentTarget);

    if (data.get('file')['name'] === '') {
      setIsError(true);
      SetError('Bạn chưa nhập file!');
      setLoading(false);
      return;
    }
    courseAdminApiService
      .uploadBanner(Number(course), data.get('file'))
      .then((data: any) => {
        setOpen(false);
        setChangeData(!changeData);
        toast.success(UploadSuccess);
        setLoading(false);
      })
      .catch((error: any) => {
        setIsError(true);
        SetError(error.message);
        setLoading(false);
      });
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
          Upload banner khóa học
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
          Tải ảnh bìa cho khóa học
        </DialogTitle>
        {isError && <Alert severity="error">{error}</Alert>}
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <TextField
              sx={{ marginTop: 4, minWidth: 120 }}
              name="file"
              type="file"
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
                Tải lên
              </LoadingButton>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UploadBanner;

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
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import lessonsApiService from 'src/services/API/LessonsApiService';
import { UploadSuccess } from 'src/utils/MessageToast';
import { toast } from 'react-toastify';

function UploadVideo({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [listLessons, setListLessons] = useState([]);
  const [lessons, setLessons] = useState('');
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
    lessonsApiService
      .getAll(-1, -1, '', -1, 1, 10, 0)
      .then((data: any) => {
        setListLessons(
          data.data.list.filter(
            (item) => item.video_type === 1 && item.id_video_driver === ''
          )
        );
      })
      .catch((error: any) => {});
  }, []);

  const handleChangeExam = (event: SelectChangeEvent) => {
    setLessons(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    if (lessons === '') {
      setIsError(true);
      SetError('Vui lòng chọn bài học!');
      setLoading(false);
      return;
    }

    if (data.get('file')['name'] === '') {
      setIsError(true);
      SetError('Bạn chưa nhập file!');
      setLoading(false);
      return;
    }

    lessonsApiService
      .uploadVideo(Number(lessons), data.get('file'))
      .then((data: any) => {
        setOpen(false);
        setChangeData(!changeData);
        toast.success(UploadSuccess);
        setLoading(false);
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
          Upload Video cho bài học
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
          Tải video cho bài học
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
                <InputLabel id="demo-simple-select-label">Bài học</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lessons}
                  label="Bài học"
                  onChange={handleChangeExam}
                >
                  {listLessons.map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
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

            <Alert sx={{ mt: 2 }} severity="info">
              Thời gian upload sẽ càng lâu nếu dung lượng file upload càng lớn!
            </Alert>

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

export default UploadVideo;

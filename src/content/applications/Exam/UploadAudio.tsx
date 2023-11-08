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
import { toast } from 'react-toastify';
import examAdminApiService from 'src/services/API/Admin/ExamAdminApiService';
import { UploadSuccess } from 'src/utils/MessageToast';
import { LoadingButton } from '@mui/lab';

function UploadAudio({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState('');
  const [listExam, setListExam] = useState([]);
  const [exam, setExam] = useState('');
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
    examAdminApiService
      .getAllNoAudio()
      .then((data) => {
        setListExam(data.data);
      })
      .catch((error: any) => {});
  }, []);

  const handleChangeExam = (event: SelectChangeEvent) => {
    setExam(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    if (exam === '') {
      setIsError(true);
      SetError('Vui lòng chọn đề thi!');
      setLoading(false);
      return;
    }

    if (data.get('file')['name'] === '') {
      setIsError(true);
      SetError('Bạn chưa nhập file!');
      setLoading(false);
      return;
    }

    examAdminApiService
      .uploadAudio(Number(exam), data.get('file'))
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
          Upload Audio cho đề thi
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
          Tải âm thanh nge cho đề thi
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
                <InputLabel id="demo-simple-select-label">Đề thi</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={exam}
                  label="Đề thi"
                  onChange={handleChangeExam}
                >
                  {listExam.map((item: any) => (
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

export default UploadAudio;

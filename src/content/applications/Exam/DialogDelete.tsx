import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Zoom
} from '@mui/material';

function DialogDelete({
  openDialogMapDelete,
  id,
  handleCloseDelete,
  handleChangeStatusExam
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialogMapDelete[id] || false}
      onClose={() => {
        handleCloseDelete(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle id="responsive-dialog-title">
        Xác nhận thay đổi trạng thái bài thi?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn thay đổi trạng thái bài thi
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleCloseDelete(id);
          }}
          variant="outlined"
        >
          Không
        </Button>
        <Button
          onClick={() => {
            handleChangeStatusExam(id);
          }}
          autoFocus
          variant="outlined"
        >
          Có
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDelete;

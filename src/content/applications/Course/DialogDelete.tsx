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
  handleChangeStatusCourse,
  fullScreen
}) {

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
        Xác nhận thay đổi trạng thái Khóa học?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn thay đổi trạng thái Khóa học?
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
            handleChangeStatusCourse(id);
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

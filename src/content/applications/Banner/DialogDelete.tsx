import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom
} from '@mui/material';

function DialogDelete({
  openDialogMapDelete,
  id,
  handleCloseDelete,
  handleChangeStatus,
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
        Xác nhận thay đổi trạng thái ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn thay đổi trạng thái ?
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
            handleChangeStatus(id);
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

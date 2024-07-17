import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom
} from '@mui/material';

function DialogDeleteNew({
  openDialogMapDeleteNew,
  id,
  handleCloseDeleteNew,
  fullScreen,
  handleDeleted
}) {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialogMapDeleteNew[id] || false}
      onClose={() => {
        handleCloseDeleteNew(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle id="responsive-dialog-title">
        Xác nhận xóa ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn thay đổi trạng thái xóa banner ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleCloseDeleteNew(id);
          }}
          variant="outlined"
        >
          Không
        </Button>
        <Button
          onClick={() => {
            handleDeleted(id);
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

export default DialogDeleteNew;

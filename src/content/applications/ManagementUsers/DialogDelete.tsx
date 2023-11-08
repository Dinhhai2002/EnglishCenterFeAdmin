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
  openDialogMap,
  id,
  handleClose,
  user,
  handleChangeStatusUser
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialogMap[id] || false}
      onClose={() => {
        handleClose(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle id="responsive-dialog-title">
        Xác nhận thay đổi trạng thái tài khoản người dùng?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn thay đổi trạng thái tài khoản người dùng{' '}
          {user.user_name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleClose(id);
          }}
          variant="outlined"
        >
          Không
        </Button>
        <Button
          onClick={() => {
            handleChangeStatusUser(id);
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

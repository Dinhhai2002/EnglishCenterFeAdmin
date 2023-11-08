import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

function TableListClass({
  listClass,
  labelTable,
  getStatusLabel,
  handleClickOpen,
  handleClose,
  handleChangeStatusClass,
  openDialogMap
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* map label bảng */}
              {labelTable.map((item: any) => (
                <TableCell align="center" key={item.id}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listClass &&
              listClass.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {item.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {item.start_date}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.sourceDesc}
                    </Typography> */}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {item.end_date}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(cryptoOrder.amount).format(
                        `${cryptoOrder.currency}0,0.00`
                      )}
                    </Typography> */}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {item.teacher_name
                          ? item.teacher_name
                          : 'Chưa có giáo viên'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {item.course_name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {item.total_student}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {getStatusLabel(item.status)}
                    </TableCell>
                    <TableCell align="center">
                      {/* <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                      <Tooltip
                        title={item.status == 1 ? 'Khóa lớp học' : 'Mở lớp học'}
                        arrow
                      >
                        {item.status == 1 ? (
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => {
                              handleClickOpen(item.id);
                            }}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        ) : (
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.success.lighter
                              },
                              color: theme.palette.success.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => {
                              handleClickOpen(item.id);
                            }}
                          >
                            <ChangeCircleIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Tooltip>
                    </TableCell>
                    {/* Dialog */}
                    <Dialog
                      fullScreen={fullScreen}
                      open={openDialogMap[item.id] || false}
                      onClose={() => {
                        handleClose(item.id);
                      }}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        Xác nhận thay đổi trạng thái Lớp học?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Bạn có chắc chắn muốn thay đổi trạng thái Lớp học?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          autoFocus
                          onClick={() => {
                            handleClose(item.id);
                          }}
                          variant="outlined"
                        >
                          Không
                        </Button>
                        <Button
                          onClick={() => {
                            handleChangeStatusClass(item.id);
                          }}
                          autoFocus
                          variant="outlined"
                        >
                          Có
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        
      </TableContainer>
    </>
  );
}

export default TableListClass;

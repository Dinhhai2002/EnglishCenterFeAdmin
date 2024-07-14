import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme
} from '@mui/material';
import IconActions from 'src/components/IconActions/IconActions';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';

function TableListBlog({
  listBlog,
  labelTable,
  getStatusLabel,
  handleChangeStatusChapter,
  handleClickOpenDelete,
  handleCloseDelete,
  openDialogMapDelete,
  handleClickOpenEdit,
  handleCloseEdit,
  openDialogMapEdit
}: any) {
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
            {listBlog &&
              listBlog.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent value={item.id} />
                    <TableCellComponent value={item.title} />
                    <TableCellComponent value={item.author_name} />
                    <TableCellComponent
                      value={item.point_avg ? item.point_avg : 0}
                    />

                    <TableCell align="center">
                      {getStatusLabel(
                        item.status,
                        'Hoạt động',
                        'Tạm khóa',
                        'Chờ duyệt'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconActions
                        title="Chỉnh sửa"
                        handleClickOpen={handleClickOpenEdit}
                        id={item.id}
                        type={2}
                      />
                      {item.status === 3 ? (
                        <IconActions
                          title="Mở"
                          handleClickOpen={handleClickOpenDelete}
                          id={item.id}
                          type={1}
                        />
                      ) : (
                        <IconActions
                          isCheck={item.status === 1 ? true : false}
                          title="khóa"
                          handleClickOpen={handleClickOpenDelete}
                          id={item.id}
                          type={0}
                        />
                      )}
                    </TableCell>
                    <DialogDelete
                      openDialogMapDelete={openDialogMapDelete}
                      id={item.id}
                      handleCloseDelete={handleCloseDelete}
                      handleChangeStatusCourse={handleChangeStatusChapter}
                      fullScreen={fullScreen}
                    />
                    {openDialogMapEdit[item.id] && (
                      <DialogEdit
                        item={item}
                        openDialogMapEdit={openDialogMapEdit}
                        id={item.id}
                        handleCloseEdit={handleCloseEdit}
                      />
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableListBlog;

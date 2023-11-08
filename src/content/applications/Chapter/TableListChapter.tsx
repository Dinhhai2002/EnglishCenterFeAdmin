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

function TableListChapter({
  listChapter,
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
            {listChapter &&
              listChapter.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent position={'center'} value={item.id} />
                    <TableCellComponent position={'center'} value={item.name} />
                    <TableCellComponent
                      position={'center'}
                      value={item.course_name}
                    />

                    <TableCell align="center">
                      {getStatusLabel(item.status, 'Hoạt động', 'Tạm khóa')}
                    </TableCell>
                    <TableCell align="center">
                      <IconActions
                        title="Chỉnh sửa"
                        handleClickOpen={handleClickOpenEdit}
                        id={item.id}
                        type={2}
                      />
                      {item.status === 1 ? (
                        <IconActions
                          title="khóa chương học"
                          handleClickOpen={handleClickOpenDelete}
                          id={item.id}
                          type={0}
                        />
                      ) : (
                        <IconActions
                          title="Mở chương học"
                          handleClickOpen={handleClickOpenDelete}
                          id={item.id}
                          type={1}
                        />
                      )}
                    </TableCell>
                    {/* Dialog */}
                    <DialogDelete
                      openDialogMapDelete={openDialogMapDelete}
                      id={item.id}
                      handleCloseDelete={handleCloseDelete}
                      handleChangeStatusCourse={handleChangeStatusChapter}
                      fullScreen={fullScreen}
                    />

                    <DialogEdit
                      openDialogMapEdit={openDialogMapEdit}
                      id={item.id}
                      handleCloseEdit={handleCloseEdit}
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableListChapter;

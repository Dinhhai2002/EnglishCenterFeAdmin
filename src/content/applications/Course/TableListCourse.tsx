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
import ActionComponent from 'src/components/IconActions/ActionComponent';
import IconActions from 'src/components/IconActions/IconActions';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import utils from 'src/utils/Utils';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';

function TableListCourse({
  listCourse,
  labelTable,
  getStatusLabel,
  getStatusMoneyCourse,
  handleChangeStatusCourse,
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
            {listCourse &&
              listCourse.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent position={'center'} value={item.id} />
                    <TableCellComponent position={'center'} value={item.name} />
                    <TableCellComponent
                      position={'right'}
                      value={utils.formatMoney(item.price) + ' đ'}
                    />
                    <TableCellComponent
                      position={'center'}
                      value={item.lessons}
                    />

                    <TableCell align="center">
                      {getStatusMoneyCourse(item.is_free)}
                    </TableCell>

                    <TableCell align="center">
                      {getStatusLabel(item.status, 'Hoạt động', 'Tạm khóa')}
                    </TableCell>
                    <ActionComponent
                      handleClickOpenEdit={handleClickOpenEdit}
                      id={item.id}
                      handleClickOpenDelete={handleClickOpenDelete}
                      status={item.status}
                    />
                    {/* Dialog */}
                    <DialogDelete
                      openDialogMapDelete={openDialogMapDelete}
                      id={item.id}
                      handleCloseDelete={handleCloseDelete}
                      handleChangeStatusCourse={handleChangeStatusCourse}
                      fullScreen={fullScreen}
                    />

                    {openDialogMapEdit[item.id] && (
                      <DialogEdit
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

export default TableListCourse;

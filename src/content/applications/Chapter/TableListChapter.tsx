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
import { IconActionEnum } from 'src/utils/enum/IconActionEnum';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
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
                    <TableCellComponent value={item.id} />
                    <TableCellComponent value={item.name} />
                    <TableCellComponent value={item.course_name} />

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
                      handleChangeStatusCourse={handleChangeStatusChapter}
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

export default TableListChapter;

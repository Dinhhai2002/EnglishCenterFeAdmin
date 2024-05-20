import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import ActionComponent from 'src/components/IconActions/ActionComponent';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';

function TableListCategoryExam({
  listCategoryCourse,
  labelTable,
  getStatusLabel,
  handleChangeStatusCategoryCourse,
  handleClickOpenDelete,
  handleCloseDelete,
  openDialogMapDelete,
  handleClickOpenEdit,
  handleCloseEdit,
  openDialogMapEdit
}: any) {
  const theme = useTheme();

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {labelTable.map((item: any) => (
                <TableCell align="center" key={item.id}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listCategoryCourse &&
              listCategoryCourse.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent position={'center'} value={item.id} />
                    <TableCellComponent position={'center'} value={item.name} />

                    <TableCell align="center">
                      {getStatusLabel(item.status, 'Hoạt động', 'Tạm khóa')}
                    </TableCell>
                    <ActionComponent
                      handleClickOpenEdit={handleClickOpenEdit}
                      id={item.id}
                      handleClickOpenDelete={handleClickOpenDelete}
                      status={item.status}
                    />

                    {/* DialogDelete */}

                    <DialogDelete
                      openDialogMapDelete={openDialogMapDelete}
                      id={item.id}
                      handleCloseDelete={handleCloseDelete}
                      handleChangeStatusCategoryCourse={
                        handleChangeStatusCategoryCourse
                      }
                    />

                    {/* DialogEdit */}

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

export default TableListCategoryExam;

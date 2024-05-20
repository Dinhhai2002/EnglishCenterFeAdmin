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
import IconActions from 'src/components/IconActions/IconActions';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import { IconActionEnum } from 'src/utils/enum/IconActionEnum';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';

function TableListCategoryExam({
  listCategoryExam,
  labelTable,
  getStatusLabel,
  handleChangeStatusCategoryExam,
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
            {listCategoryExam &&
              listCategoryExam.map((item: any) => {
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
                      handleChangeStatusCategoryExam={
                        handleChangeStatusCategoryExam
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

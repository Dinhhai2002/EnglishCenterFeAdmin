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
import Label from 'src/components/Label';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';

function TableListExam({
  listExam,
  labelTable,
  getStatusLabel,
  handleChangeStatusExam,
  handleClickOpenDelete,
  handleCloseDelete,
  openDialogMapDelete,
  handleClickOpenEdit,
  handleCloseEdit,
  openDialogMapEdit
}: any) {
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
            {listExam &&
              listExam.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent position={'center'} value={item.name} />
                    <TableCellComponent
                      position={'center'}
                      value={item.topic_name}
                    />
                    <TableCellComponent
                      position={'center'}
                      value={item.time_minutes + ' phút'}
                    />
                    <TableCellComponent
                      position={'center'}
                      value={item.total_question}
                    />

                    <TableCellComponent
                      position={'center'}
                      value={item.total_user}
                    />

                    <TableCell align="center">
                      {item.audio_id === 0 ? (
                        <Label color="error">Chưa có</Label>
                      ) : (
                        <Label color="success">Đã có</Label>
                      )}
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
                    {openDialogMapDelete[item.id] && (
                      <DialogDelete
                        openDialogMapDelete={openDialogMapDelete}
                        id={item.id}
                        handleCloseDelete={handleCloseDelete}
                        handleChangeStatusExam={handleChangeStatusExam}
                      />
                    )}
                    {openDialogMapEdit[item.id] && (
                      <DialogEdit
                        item={item}
                        openDialogMapEdit={openDialogMapEdit[item.id]}
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

export default TableListExam;

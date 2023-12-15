import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, useTheme
} from '@mui/material';
import IconActions from 'src/components/IconActions/IconActions';
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
  const theme = useTheme();
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
                    {/* <TableCell align="center">
                      {getStatusLabel(item.is_question, 'Đã có', 'Chưa có')}
                    </TableCell> */}
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
                          title="khóa đề thi"
                          handleClickOpen={handleClickOpenDelete}
                          id={item.id}
                          type={0}
                        />
                      ) : (
                        <IconActions
                          title="Mở đề thi"
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
                      handleChangeStatusExam={handleChangeStatusExam}
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

export default TableListExam;

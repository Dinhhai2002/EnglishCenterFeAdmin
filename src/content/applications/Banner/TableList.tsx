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
import Image from 'mui-image';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';

function TableList({
  listBanner,
  labelTable,
  getStatusLabel,
  handleChangeStatus,
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
            {listBanner &&
              listBanner.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent value={item.id} />
                    {/* <TableCellComponent value={item.url} /> */}
                    <TableCell align="center">
                      <Image
                        src={item.url}
                        sx={{
                          width: 10,
                          height: 10,
                          objectFit: 'cover'
                        }}
                      />
                    </TableCell>

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
                      {item.status === StatusEnum.OFF ? (
                        <IconActions
                          title="Mở banner"
                          handleClickOpen={handleClickOpenDelete}
                          id={item.id}
                          type={1}
                        />
                      ) : (
                        <IconActions
                          title="khóa banner"
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
                      handleChangeStatus={handleChangeStatus}
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

export default TableList;

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import IconActions from 'src/components/IconActions/IconActions';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import { User } from 'src/types/User';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import DialogDelete from './DialogDelete';

function TableListUser({
  listUser,
  labelTable,
  getStatusLabel,
  handleClickOpen,
  handleClose,
  handleChangeStatusUser,
  openDialogMap
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
            {listUser.map((user: User) => {
              return (
                <TableRow hover key={user.id}>
                  <TableCellComponent position={'center'} value={user.id} />
                  <TableCellComponent
                    position={'center'}
                    value={user.user_name}
                  />
                  <TableCellComponent
                    position={'center'}
                    value={user.birthday}
                  />

                  <TableCellComponent position={'center'} value={user.email} />

                  <TableCellComponent position={'center'} value={user.phone} />

                  <TableCell align="center">
                    {getStatusLabel(user.is_active, 'Hoạt động', 'Tạm khóa')}
                  </TableCell>
                  <TableCell align="center">
                    {user.is_active === StatusEnum.ON ? (
                      <IconActions
                        title="khóa tài khoản"
                        handleClickOpen={handleClickOpen}
                        id={user.id}
                        type={0}
                      />
                    ) : (
                      <IconActions
                        title="Mở tài khoản"
                        handleClickOpen={handleClickOpen}
                        id={user.id}
                        type={1}
                      />
                    )}
                  </TableCell>

                  <DialogDelete
                    openDialogMap={openDialogMap}
                    id={user.id}
                    handleClose={handleClose}
                    user={user}
                    handleChangeStatusUser={handleChangeStatusUser}
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

export default TableListUser;

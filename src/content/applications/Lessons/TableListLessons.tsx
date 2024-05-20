import {
  Button,
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
import DialogVideo from './DialogVideo';

function TableListLessons({
  listLessons,
  labelTable,
  getStatusLabel,
  handleChangeStatusLessons,
  handleClickOpenDelete,
  handleCloseDelete,
  openDialogMapDelete,
  handleClickOpenEdit,
  handleCloseEdit,
  openDialogMapEdit,
  handleClickOpenVideo,
  handleCloseVideo,
  openDialogMapVideo
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
            {listLessons &&
              listLessons.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent position={'center'} value={item.id} />
                    <TableCellComponent position={'center'} value={item.name} />
                    <TableCellComponent
                      position={'center'}
                      value={item.course_name}
                    />
                    <TableCellComponent
                      position={'center'}
                      value={item.chapter_name}
                    />
                    <TableCell align="center">
                      {getStatusLabel(
                        item.is_upload_video,
                        'Đã upload',
                        'Chưa upload'
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

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleClickOpenVideo(item.id);
                        }}
                        disabled={item.is_upload_video === 1 ? false : true}
                      >
                        Xem
                      </Button>
                    </TableCell>
                    {/* Dialog */}
                    <DialogDelete
                      openDialogMapDelete={openDialogMapDelete}
                      id={item.id}
                      handleCloseDelete={handleCloseDelete}
                      handleChangeStatusLessons={handleChangeStatusLessons}
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
                    {openDialogMapVideo[item.id] && (
                      <DialogVideo
                        openDialogMapVideo={openDialogMapVideo}
                        id={item.id}
                        handleCloseVideo={handleCloseVideo}
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

export default TableListLessons;

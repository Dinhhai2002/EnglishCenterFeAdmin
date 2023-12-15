import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ChangeEvent, createContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Empty from 'src/components/Empty/Empty';
import courseAdminApiService from 'src/services/API/Admin/CourseAdminApiService';

import PaginationComponent from 'src/components/Pagination/PaginationComponent';
import {
  getStatusLabel,
  getStatusMoneyCourse,
  labelTableClassInCourse,
  labelTableCourse,
  statusOptions
} from 'src/utils/LabelTable';
import TableListCourse from './TableListCourse';
import TableShowListClass from './TableShowListClass';
import DropDownComponent from 'src/components/DropDownComponent/DropDownComponent';
import Search from 'src/components/Search/Search';

const CourseContext = createContext(null);

export const RecentOrdersTable = ({
  listCourse,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [valueSearch, setValueSearch] = useState('');
  const [listClass, setListClass] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState({});
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // xử lí đóng mở model delete và edit theo id
  const handleClickOpenDelete = (id) => {
    setOpenDialogMapDelete((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };

  const handleClickOpenEdit = (id) => {
    setOpenDialogMapEdit((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };

  const handleCloseDelete = (id) => {
    setOpenDialogMapDelete((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };

  const handleCloseEdit = (id) => {
    setOpenDialogMapEdit((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };

  const handleOpenShowList = () => {
    setOpen(true);
  };
  const handleCloseShowList = () => {
    setOpen(false);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStatusValue(Number(e.target.value));
  };

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(Number(value));
  };

  const handleChangeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  useEffect(() => {
    onClickPagination(valueSearch, page, limit, statusValue);
  }, [page]);

  useEffect(() => {
    onClickPagination(valueSearch, 1, limit, statusValue);
  }, [limit]);

  useEffect(() => {
    onClickPagination(valueSearch, 1, limit, statusValue);
  }, [statusValue]);

  //
  const handleChangeStatusCourse = (id: number) => {
    courseAdminApiService
      .changeStatus(id)
      .then((data: any) => {
        onClickPagination(valueSearch, page, limit, statusValue);
        toast.success(`Chỉnh sửa thành công!`);
      })
      .catch((error: any) => {
        // toast.error(`${error.error.response.data.message}`);
        // setListClass(error.error.response.data.data);
        // setTimeout(() => {
        //   handleOpenShowList();
        // }, 1500);
      });

    handleCloseDelete(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(valueSearch, 1, limit, statusValue);
  };

  /**
   * hàm này để lắng nge sự kiện sau khi edit xong
   * thì gọi lại để lấy dữ liệu mới sau khi edit
   */
  const onChangeValue = () => {
    onClickPagination(valueSearch, page, limit, statusValue);
  };

  return (
    <CourseContext.Provider value={{ onChangeValue }}>
      <Card>
        <CardHeader
          action={
            <Box
              width={600}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Search
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
                handleSubmitSearch={handleSubmitSearch}
                label="Tìm kiếm khóa học"
              />
              <DropDownComponent
                arr={statusOptions}
                label="Status"
                value={statusValue}
                handleStatusChange={handleStatusChange}
                type={0}
              />
            </Box>
          }
          title="Danh sách khóa học"
        />

        <Divider />
        <TableListCourse
          listCourse={listCourse}
          labelTable={labelTableCourse}
          getStatusLabel={getStatusLabel}
          getStatusMoneyCourse={getStatusMoneyCourse}
          handleChangeStatusCourse={handleChangeStatusCourse}
          handleClickOpenDelete={handleClickOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDialogMapDelete={openDialogMapDelete}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openDialogMapEdit={openDialogMapEdit}
        />
        {listCourse.length > 0 ? (
          <PaginationComponent
            handleChangePagination={handleChangePagination}
            handleChangeLimit={handleChangeLimit}
            totalRecord={totalRecord}
            limit={limit}
          />
        ) : (
          <Box p={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Empty />
          </Box>
        )}

        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Danh sách lớp học đang hoạt động
          </DialogTitle>
          <DialogContent>
            <TableShowListClass
              listClass={listClass}
              labelTableClass={labelTableClassInCourse}
              getStatusLabel={getStatusLabel}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" autoFocus onClick={handleCloseShowList}>
              Thoát
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </CourseContext.Provider>
  );
};

export default CourseContext;

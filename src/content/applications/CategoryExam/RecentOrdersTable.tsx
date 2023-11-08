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
import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import Empty from 'src/components/Empty/Empty';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginationComponent from 'src/components/Pagination/PaginationComponent';
import categoryExamAdminApiService from 'src/services/API/Admin/CategoryExamAdminApiService';
import {
  getStatusLabel,
  labelTableCategoryExam,
  labelTableExamInCategoryExam,
  statusOptions
} from 'src/utils/LabelTable';
import TableListCategoryExam from './TableListCategoryExam';
import TableShowListExam from './TableShowListExam';
import DropDownComponent from 'src/components/DropDownComponent/DropDownComponent';
import Search from 'src/components/Search/Search';

const CategoryExamContext = createContext(null);

export const RecentOrdersTable = ({
  listCategoryExam,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [valueSearch, setValueSearch] = useState('');
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState({});
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});
  const [listExam, setListExam] = useState([]);

  const [open, setOpen] = useState(false);

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

  // xử lí show list exam đang hoạt động thuộc danh mục đề thi
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

  /**
   * khi có sự kiện thay đổi thì truyền sự kiện
   * lên component cha để gọi lấy list danh sách
   */
  useEffect(() => {
    onClickPagination(valueSearch, page, limit, statusValue);
  }, [page]);

  useEffect(() => {
    onClickPagination(valueSearch, 1, limit, statusValue);
  }, [limit]);

  useEffect(() => {
    onClickPagination(valueSearch, 1, limit, statusValue);
  }, [statusValue]);

  const handleChangeStatusCategoryExam = (id: number) => {
    categoryExamAdminApiService
      .changeStatus(id)
      .then((data: any) => {
        onClickPagination(valueSearch, page, limit, statusValue);
        toast.success(`Chỉnh sửa thành công!`);
      })
      .catch((error: any) => {
        // toast lỗi sau 1.5s thì hiển thị model những đề thi thuộc danh mục đang hoạt động
        toast.error(`${error.error.response.data.message}`);
        setListExam(error.error.response.data.data);
        setTimeout(() => {
          handleOpenShowList();
        }, 1500);
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
    <CategoryExamContext.Provider value={{ onChangeValue }}>
      <Card>
        <ToastContainer />
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
                label="Tìm kiếm danh mục đề thi"
              />
              <DropDownComponent
                arr={statusOptions}
                label="Trạng thái"
                value={statusValue}
                handleStatusChange={handleStatusChange}
                type={0}
              />
            </Box>
          }
          title="Danh sách danh mục đề thi"
        />

        <Divider />

        <TableListCategoryExam
          listCategoryExam={listCategoryExam}
          labelTable={labelTableCategoryExam}
          getStatusLabel={getStatusLabel}
          handleChangeStatusCategoryExam={handleChangeStatusCategoryExam}
          handleClickOpenDelete={handleClickOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDialogMapDelete={openDialogMapDelete}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openDialogMapEdit={openDialogMapEdit}
        />

        {listCategoryExam.length > 0 ? (
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
            Danh sách đề thi đang hoạt động
          </DialogTitle>
          <DialogContent>
            <TableShowListExam
              listExam={listExam}
              labelTableExam={labelTableExamInCategoryExam}
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
    </CategoryExamContext.Provider>
  );
};

export default CategoryExamContext;

import {
  Box,
  Card,
  CardHeader,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ChangeEvent, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import DropDownComponent from 'src/components/DropDownComponent/DropDownComponent';
import Empty from 'src/components/Empty/Empty';
import PaginationComponent from 'src/components/Pagination/PaginationComponent';
import Search from 'src/components/Search/Search';
import authenticationApiService from 'src/services/API/AuthenticationApiService';
import postApiService from 'src/services/API/PostApiService';
import {
  getStatusLabelBlog,
  labelTableBlog,
  statusOptionsBlog
} from 'src/utils/LabelTable';
import { EditSuccess } from 'src/utils/MessageToast';
import TableListBlog from './TableListBlog';

const ChapterContext = createContext(null);

export const RecentOrdersTable = ({
  listBlog,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [valueSearch, setValueSearch] = useState('');
  const [listCategoryBlog, setListCategoryBlog] = useState([]);
  const [categoryBlog, setCategoryBlog] = useState<number>(-1);
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState({});
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    authenticationApiService
      .getAllCategoryBlog()
      .then((data) => {
        setListCategoryBlog(data.data);
      })
      .catch((error: any) => {});
  }, []);

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

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStatusValue(Number(e.target.value));
  };

  const handleStatusCategoryBlog = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategoryBlog(Number(e.target.value));
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
    onClickPagination(categoryBlog, valueSearch, statusValue, page, limit);
  }, [page]);

  useEffect(() => {
    onClickPagination(categoryBlog, valueSearch, statusValue, 1, limit);
  }, [limit]);

  useEffect(() => {
    onClickPagination(categoryBlog, valueSearch, statusValue, 1, limit);
  }, [statusValue]);

  useEffect(() => {
    onClickPagination(categoryBlog, valueSearch, statusValue, 1, limit);
  }, [categoryBlog]);

  const handleChangeStatusChapter = (id: number) => {
    postApiService
      .changeStatus(id)
      .then((data: any) => {
        onClickPagination(categoryBlog, valueSearch, statusValue, page, limit);
        toast.success(EditSuccess);
      })
      .catch((error: any) => {
        toast.error(`${error.error.response.data.message}`);
      });

    handleCloseDelete(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(categoryBlog, valueSearch, statusValue, 1, limit);
  };

  /**
   * hàm này để lắng nge sự kiện sau khi edit xong
   * thì gọi lại để lấy dữ liệu mới sau khi edit
   */
  const onChangeValue = () => {
    onClickPagination(categoryBlog, valueSearch, statusValue, 1, limit);
  };

  return (
    <ChapterContext.Provider value={{ onChangeValue }}>
      <Card>
        <CardHeader
          action={
            <Box
              width={600}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <DropDownComponent
                arr={listCategoryBlog}
                label="Tên danh mục blog"
                value={categoryBlog}
                handleStatusChange={handleStatusCategoryBlog}
                type={1}
              />
              <Search
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
                handleSubmitSearch={handleSubmitSearch}
                label="Tìm kiếm blog"
              />
              <DropDownComponent
                arr={statusOptionsBlog}
                label="Trạng thái"
                value={statusValue}
                handleStatusChange={handleStatusChange}
                type={0}
              />
            </Box>
          }
          title="Danh sách Blog"
        />

        <Divider />
        <TableListBlog
          listBlog={listBlog}
          labelTable={labelTableBlog}
          getStatusLabel={getStatusLabelBlog}
          handleChangeStatusChapter={handleChangeStatusChapter}
          handleClickOpenDelete={handleClickOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDialogMapDelete={openDialogMapDelete}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openDialogMapEdit={openDialogMapEdit}
        />
        {listBlog.length > 0 ? (
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
      </Card>
    </ChapterContext.Provider>
  );
};

export default ChapterContext;

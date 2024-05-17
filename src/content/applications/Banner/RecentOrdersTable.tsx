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
import bannerApiService from 'src/services/API/BannerApiService';
import postApiService from 'src/services/API/PostApiService';
import {
  getStatusLabel,
  labelTableBanner,
  statusOptions
} from 'src/utils/LabelTable';
import { EditSuccess } from 'src/utils/MessageToast';
import TableList from './TableList';
import TableListBlog from './TableList';

const ChapterContext = createContext(null);

export const RecentOrdersTable = ({
  listBanner,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState({});
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});

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
    onClickPagination(statusValue, page, limit);
  }, [page]);

  useEffect(() => {
    onClickPagination(statusValue, 1, limit);
  }, [limit, statusValue]);

  const handleChangeStatus = (id: number) => {
    bannerApiService
      .changeStatus(id)
      .then((data: any) => {
        onClickPagination(statusValue, page, limit);
        toast.success(EditSuccess);
      })
      .catch((error: any) => {
        toast.error(`${error.error.response.data.message}`);
      });

    handleCloseDelete(id);
  };

  /**
   * hàm này để lắng nge sự kiện sau khi edit xong
   * thì gọi lại để lấy dữ liệu mới sau khi edit
   */
  const onChangeValue = () => {
    onClickPagination(statusValue, 1, limit);
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
                arr={statusOptions}
                label="Trạng thái"
                value={statusValue}
                handleStatusChange={handleStatusChange}
                type={0}
              />
            </Box>
          }
          title="Danh sách Banner"
        />

        <Divider />
        <TableList
          listBanner={listBanner}
          labelTable={labelTableBanner}
          getStatusLabel={getStatusLabel}
          handleChangeStatus={handleChangeStatus}
          handleClickOpenDelete={handleClickOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDialogMapDelete={openDialogMapDelete}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openDialogMapEdit={openDialogMapEdit}
        />
        {listBanner.length > 0 ? (
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

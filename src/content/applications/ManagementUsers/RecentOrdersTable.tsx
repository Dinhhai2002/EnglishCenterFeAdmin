import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Card,
  CardHeader,
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
import { ChangeEvent, useEffect, useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Empty from 'src/components/Empty/Empty';
import PaginationComponent from 'src/components/Pagination/PaginationComponent';
import userAdminApiService from 'src/services/API/Admin/UserAdminApiService';
import {
  getStatusLabel,
  labelTableUser,
  statusOptions
} from 'src/utils/LabelTable';
import TableListUser from './TableListUser';
import { EditSuccess } from 'src/utils/MessageToast';
import DropDownComponent from 'src/components/DropDownComponent/DropDownComponent';
import Search from 'src/components/Search/Search';

const RecentOrdersTable = ({ listUser, totalRecord, onClickPagination }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [valueSearch, setValueSearch] = useState('');
  const [openDialogMap, setOpenDialogMap] = useState({});

  const theme = useTheme();

  const handleClickOpen = (id) => {
    setOpenDialogMap((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };

  const handleClose = (id) => {
    setOpenDialogMap((prevState) => ({
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
    console.log(limit);
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
  const handleChangeStatusUser = (id: number) => {
    userAdminApiService
      .changeStatus(id)
      .then((data: any) => {
        onClickPagination(valueSearch, page, limit, statusValue);
        toast.success(EditSuccess);
      })
      .catch((error: any) => {});

    handleClose(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(valueSearch, 1, limit, statusValue);
  };

  return (
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
              label="tìm kiếm người dùng"
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
        title="Danh sách người dùng"
      />

      <Divider />
      <TableListUser
        listUser={listUser}
        labelTable={labelTableUser}
        getStatusLabel={getStatusLabel}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleChangeStatusUser={handleChangeStatusUser}
        openDialogMap={openDialogMap}
      />
      {listUser.length > 0 ? (
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
  );
};

export default RecentOrdersTable;

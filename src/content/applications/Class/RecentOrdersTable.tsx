import SearchIcon from '@mui/icons-material/Search';
import {
  Box, Card,
  CardHeader, Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem, Paper,
  Select
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Empty from 'src/components/Empty/Empty';
import PaginationComponent from 'src/components/Pagination/PaginationComponent';
import { CryptoOrderStatus } from 'src/models/crypto_order';
import classAdminApiService from 'src/services/API/Admin/ClassAdminApiService';
import {
  getStatusLabel, labelTableClass,
  statusOptions
} from 'src/utils/LabelTable';
import TableListClass from './TableListClass';

interface Filters {
  status?: CryptoOrderStatus;
}

const RecentOrdersTable = ({
  listClass,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [valueSearch, setValueSearch] = useState('');
  const [openDialogMap, setOpenDialogMap] = useState({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
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

  const handleChangeStatusClass = (id: number) => {
    classAdminApiService
      .changeStatus(id)
      .then((data: any) => {
        toast.success(`Đổi trạng thái thành công!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        onClickPagination(valueSearch, page, limit, statusValue);
      })
      .catch((error: any) => {
        toast.error(`${error.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });

    handleClose(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(valueSearch, 1, limit, statusValue);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box
            width={600}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm lớp học"
                inputProps={{ 'aria-label': 'Tìm kiếm lớp học' }}
                onChange={(e) => {
                  setValueSearch(e.target.value);
                }}
                value={valueSearch}
              />
              <IconButton
                onClick={handleSubmitSearch}
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>

            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusValue}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        }
        title="Danh sách lớp học"
      />

      <Divider />
      <ToastContainer />

      <TableListClass
        listClass={listClass}
        labelTable={labelTableClass}
        getStatusLabel={getStatusLabel}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleChangeStatusClass={handleChangeStatusClass}
        openDialogMap={openDialogMap}
      />

      {listClass.length > 0 ? (
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

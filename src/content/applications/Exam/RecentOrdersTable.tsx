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
  Select
} from '@mui/material';
import { ChangeEvent, createContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Empty from 'src/components/Empty/Empty';
import PaginationComponent from 'src/components/Pagination/PaginationComponent';
import examAdminApiService from 'src/services/API/Admin/ExamAdminApiService';
import {
  getStatusLabel,
  labelTableExam,
  statusOptions
} from 'src/utils/LabelTable';
import TableListExam from './TableListExam';
import { EditSuccess } from 'src/utils/MessageToast';
import DropDownComponent from 'src/components/DropDownComponent/DropDownComponent';
import Search from 'src/components/Search/Search';
import topicExamApiService from 'src/services/API/TopicExamApiService';

const ExamContext = createContext(null);

export const RecentOrdersTable = ({
  listExam,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [valueSearch, setValueSearch] = useState('');
  const [listTopic, setListTopic] = useState([]);
  const [topic, setTopic] = useState<number>(-1);
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState({});
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});

  useEffect(() => {
    topicExamApiService
      .getAll()
      .then((data) => {
        setListTopic(data.data);
      })
      .catch((error) => {});
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

  console.log(topic);

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStatusValue(Number(e.target.value));
  };

  const handleChangeTopic = (e: ChangeEvent<HTMLInputElement>): void => {
    setTopic(Number(e.target.value));
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
    onClickPagination(topic, valueSearch, page, limit, statusValue);
  }, [page]);

  useEffect(() => {
    onClickPagination(topic, valueSearch, 1, limit, statusValue);
  }, [limit, statusValue]);

  // useEffect(() => {
  //   onClickPagination(topic, valueSearch, 1, limit, statusValue);
  // }, [statusValue]);

  useEffect(() => {
    onClickPagination(topic, valueSearch, 1, limit, statusValue);
  }, [topic]);

  //
  const handleChangeStatusExam = (id: number) => {
    examAdminApiService
      .changeStatus(id)
      .then((data: any) => {
        onClickPagination(topic, valueSearch, page, limit, statusValue);
        toast.success(EditSuccess);
      })
      .catch((error: any) => {});

    handleCloseDelete(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(topic, valueSearch, 1, limit, statusValue);
  };

  /**
   * hàm này để lắng nge sự kiện sau khi edit xong
   * thì gọi lại để lấy dữ liệu mới sau khi edit
   */
  const onChangeValue = () => {
    onClickPagination(valueSearch, page, limit, statusValue);
  };

  return (
    <ExamContext.Provider value={{ onChangeValue }}>
      <Card>
        <CardHeader
          action={
            <Box
              width={600}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <DropDownComponent
                arr={listTopic}
                label="Tên khóa học"
                value={topic}
                handleStatusChange={handleChangeTopic}
                type={1}
              />

              <Search
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
                handleSubmitSearch={handleSubmitSearch}
                label="Tìm kiếm đề thi"
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
          title="Danh sách đề thi"
        />

        <Divider />
        <TableListExam
          listExam={listExam}
          labelTable={labelTableExam}
          getStatusLabel={getStatusLabel}
          handleChangeStatusExam={handleChangeStatusExam}
          handleClickOpenDelete={handleClickOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDialogMapDelete={openDialogMapDelete}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openDialogMapEdit={openDialogMapEdit}
        />
        {listExam.length > 0 ? (
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
    </ExamContext.Provider>
  );
};

export default ExamContext;

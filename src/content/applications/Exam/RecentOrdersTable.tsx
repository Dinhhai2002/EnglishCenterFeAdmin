import { Box, Card, CardHeader, Divider } from '@mui/material';
import { ChangeEvent, createContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import DropDownComponent from 'src/components/DropDownComponent/DropDownComponent';
import Empty from 'src/components/Empty/Empty';
import PaginationComponent from 'src/components/Pagination/PaginationComponent';
import Search from 'src/components/Search/Search';
import examAdminApiService from 'src/services/API/Admin/ExamAdminApiService';
import topicExamApiService from 'src/services/API/TopicExamApiService';
import { PAGE_DEFAULT } from 'src/utils/Constant';
import {
  getStatusLabel,
  labelTableExam,
  statusOptions
} from 'src/utils/LabelTable';
import { EditSuccess } from 'src/utils/MessageToast';
import TableListExam from './TableListExam';

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
  }, [limit, statusValue, topic]);

  //
  const handleChangeStatusExam = async (id: number) => {
    const response = await examAdminApiService.changeStatus(id);
    await console.log(response);
    onClickPagination(topic, valueSearch, page, limit, statusValue);
    toast.success(EditSuccess);

    handleCloseDelete(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(topic, valueSearch, PAGE_DEFAULT, limit, statusValue);
  };

  /**
   * hàm này để lắng nge sự kiện sau khi edit xong
   * thì gọi lại để lấy dữ liệu mới sau khi edit
   */
  const onChangeValue = () => {
    onClickPagination(topic, valueSearch, page, limit, statusValue);
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
        <PaginationComponent
          handleChangePagination={handleChangePagination}
          handleChangeLimit={handleChangeLimit}
          totalRecord={totalRecord}
          limit={limit}
        />
      </Card>
    </ExamContext.Provider>
  );
};

export default ExamContext;

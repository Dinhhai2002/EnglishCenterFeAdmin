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
import chapterApiService from 'src/services/API/ChapterApiService';
import courseApiService from 'src/services/API/CourseApiService';
import lessonsApiService from 'src/services/API/LessonsApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import {
  getStatusLabel,
  labelTableLessons,
  statusOptions
} from 'src/utils/LabelTable';
import { EditSuccess } from 'src/utils/MessageToast';
import TableListLessons from './TableListLessons';

const LessonsContext = createContext(null);

export const RecentOrdersTable = ({
  listLessons,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<number>(-1);
  const [valueSearch, setValueSearch] = useState('');
  const [listCourse, setListCourse] = useState([]);
  const [course, setCourse] = useState<number>(-1);
  const [listChapter, setListChapter] = useState([]);
  const [chapter, setChapter] = useState<number>(-1);
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState({});
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});
  const [openDialogMapVideo, setOpenDialogMapVideo] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const fetchChapter = async (course: number) => {
    const data = await chapterApiService.getAll(
      course,
      '',
      StatusEnum.ALL,
      0,
      PAGE_DEFAULT,
      LIMIT_DEFAULT
    );
    setListChapter(data.data.list);
  };
  useEffect(() => {
    courseApiService
      .getAll()
      .then((data) => {
        setListCourse(data.data);
      })
      .catch((error: any) => {});
    fetchChapter(-1);
  }, []);

  // xử lí đóng mở model delete và edit theo id
  const handleClickOpenDelete = (id) => {
    setOpenDialogMapDelete((prevState) => ({
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

  const handleClickOpenEdit = (id) => {
    setOpenDialogMapEdit((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };

  const handleCloseEdit = (id) => {
    setOpenDialogMapEdit((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };

  const handleClickOpenVideo = (id) => {
    setOpenDialogMapVideo((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };

  const handleCloseVideo = (id) => {
    setOpenDialogMapVideo((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStatusValue(Number(e.target.value));
  };

  const handleStatusCourse = (e: ChangeEvent<HTMLInputElement>): void => {
    setCourse(Number(e.target.value));
  };

  const handleStatusChapter = (e: ChangeEvent<HTMLInputElement>): void => {
    setChapter(Number(e.target.value));
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
    onClickPagination(course, chapter, valueSearch, page, limit, statusValue);
  }, [page]);

  useEffect(() => {
    onClickPagination(
      course,
      chapter,
      valueSearch,
      PAGE_DEFAULT,
      limit,
      statusValue
    );
  }, [limit, statusValue, chapter]);

  useEffect(() => {
    onClickPagination(course, chapter, valueSearch, 1, limit, statusValue);
    fetchChapter(course);
  }, [course]);

  //
  const handleChangeStatusLessons = async (id: number) => {
    await lessonsApiService.changeStatus(id);
    onClickPagination(course, -1, valueSearch, page, limit, statusValue);
    toast.success(EditSuccess);

    handleCloseDelete(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(course, chapter, valueSearch, 1, limit, statusValue);
  };

  /**
   * hàm này để lắng nge sự kiện sau khi edit xong
   * thì gọi lại để lấy dữ liệu mới sau khi edit
   */
  const onChangeValue = () => {
    onClickPagination(course, chapter, valueSearch, 1, limit, statusValue);
  };

  return (
    <LessonsContext.Provider value={{ onChangeValue }}>
      <Card>
        <CardHeader
          action={
            <Box
              width={600}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <DropDownComponent
                arr={listCourse}
                label="Tên khóa học"
                value={course}
                handleStatusChange={handleStatusCourse}
                type={1}
              />

              <DropDownComponent
                arr={listChapter}
                label="Tên chương học"
                value={chapter}
                handleStatusChange={handleStatusChapter}
                type={1}
              />

              <Search
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
                handleSubmitSearch={handleSubmitSearch}
                label="Tìm kiếm bài học"
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
          title="Danh sách bài học"
        />

        <Divider />
        <TableListLessons
          listLessons={listLessons}
          labelTable={labelTableLessons}
          getStatusLabel={getStatusLabel}
          handleChangeStatusLessons={handleChangeStatusLessons}
          handleClickOpenDelete={handleClickOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDialogMapDelete={openDialogMapDelete}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openDialogMapEdit={openDialogMapEdit}
          openDialogMapVideo={openDialogMapVideo}
          handleClickOpenVideo={handleClickOpenVideo}
          handleCloseVideo={handleCloseVideo}
        />
        {listLessons.length > 0 ? (
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
    </LessonsContext.Provider>
  );
};

export default LessonsContext;

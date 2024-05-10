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
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import {
  getStatusLabel,
  labelTableChapter,
  labelTableLessonsInChapter,
  statusOptions
} from 'src/utils/LabelTable';
import { EditSuccess } from 'src/utils/MessageToast';
import TableListChapter from './TableListChapter';
import TableShowListLessons from './TableShowListLessons';

const ChapterContext = createContext(null);

export const RecentOrdersTable = ({
  listChapter,
  totalRecord,
  onClickPagination
}: any) => {
  const [page, setPage] = useState<number>(PAGE_DEFAULT);
  const [limit, setLimit] = useState<number>(LIMIT_DEFAULT);
  const [statusValue, setStatusValue] = useState<number>(StatusEnum.ALL);
  const [valueSearch, setValueSearch] = useState('');
  const [listLessons, setListLessons] = useState([]);
  const [listCourse, setListCourse] = useState([]);
  const [course, setCourse] = useState<number>(-1);
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState({});
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    courseApiService
      .getAll()
      .then((data) => {
        setListCourse(data.data);
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

  const handleOpenShowList = () => {
    setOpen(true);
  };
  const handleCloseShowList = () => {
    setOpen(false);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStatusValue(Number(e.target.value));
  };

  const handleStatusCourse = (e: ChangeEvent<HTMLInputElement>): void => {
    setCourse(Number(e.target.value));
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
    onClickPagination(course, valueSearch, page, limit, statusValue);
  }, [page]);

  useEffect(() => {
    onClickPagination(course, valueSearch, PAGE_DEFAULT, limit, statusValue);
  }, [limit, statusValue, course]);

  //
  const handleChangeStatusChapter = (id: number) => {
    chapterApiService
      .changeStatus(id)
      .then((data: any) => {
        onClickPagination(course, valueSearch, page, limit, statusValue);
        toast.success(EditSuccess);
      })
      .catch((error: any) => {
        toast.error(`${error.error.response.data.message}`);
        setListLessons(error.error.response.data.data);
        setTimeout(() => {
          handleOpenShowList();
        }, 1500);
      });

    handleCloseDelete(id);
  };

  const handleSubmitSearch = () => {
    onClickPagination(course, valueSearch, PAGE_DEFAULT, limit, statusValue);
  };

  /**
   * hàm này để lắng nge sự kiện sau khi edit xong
   * thì gọi lại để lấy dữ liệu mới sau khi edit
   */
  const onChangeValue = () => {
    onClickPagination(course, valueSearch, PAGE_DEFAULT, limit, statusValue);
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
                arr={listCourse}
                label="Tên khóa học"
                value={course}
                handleStatusChange={handleStatusCourse}
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
          title="Danh sách bài thi"
        />

        <Divider />
        <TableListChapter
          listChapter={listChapter}
          labelTable={labelTableChapter}
          getStatusLabel={getStatusLabel}
          handleChangeStatusChapter={handleChangeStatusChapter}
          handleClickOpenDelete={handleClickOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDialogMapDelete={openDialogMapDelete}
          handleClickOpenEdit={handleClickOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openDialogMapEdit={openDialogMapEdit}
        />
        {listChapter.length > 0 ? (
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
            <TableShowListLessons
              listLessons={listLessons}
              labelTableLessons={labelTableLessonsInChapter}
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
    </ChapterContext.Provider>
  );
};

export default ChapterContext;

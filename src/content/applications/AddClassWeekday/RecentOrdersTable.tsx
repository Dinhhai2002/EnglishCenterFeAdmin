import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Empty from 'src/components/Empty/Empty';
import { CryptoOrderStatus } from 'src/models/crypto_order';
import classWeekdayApiService from 'src/services/API/ClassWeekdayApiService';
import courseApiService from 'src/services/API/CourseApiService';
import hourApiService from 'src/services/API/HourApiService';
import utils from 'src/utils/Utils';
import BulkActions from './BulkActions';
import weekdayApiService from 'src/services/API/WeekdayApiService';

interface Filters {
  status?: CryptoOrderStatus;
}

const RecentOrdersTable = () => {
  const [selectedHour, setSelectedHour] = useState<string[]>([]);
  const selectedBulkActions = selectedHour.length > 0;

  const [listCourse, setListCourse] = useState([]);
  const [courseId, setCourseId] = useState<number>(Number(0));
  const [listClass, setListClass] = useState<number[]>([]);
  const [classId, setClassId] = useState<number>(Number(0));
  // const [listStudent, setListStudent] = useState([]);
  const [listHour, setListHour] = useState([]);
  const [weekdayId, setWeekdayId] = useState<number>(Number(-1));
  const [listWeekday, setListWeekday] = useState([]);

  // pagination
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalRecord, setTotalRecord] = useState<number>(0);

  useEffect(() => {
    courseApiService
      .getAll()
      .then((data: any) => {
        setListCourse(data.data);
      })
      .catch((error: any) => {});

    hourApiService
      .getAll(-1, page, limit)
      .then((data: any) => {
        setListHour(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});

    weekdayApiService
      .getAll()
      .then((data: any) => {
        setListWeekday(data.data);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    courseApiService
      .getListClassByIdAddHour(courseId)
      .then((data: any) => {
        setListClass(data.data);
      })
      .catch((error: any) => {});
  }, [courseId]);

  const handleChangeCourse = (e: ChangeEvent<HTMLInputElement>): void => {
    setCourseId(Number(e.target.value));
  };
  const handleChangeClass = (e: ChangeEvent<HTMLInputElement>): void => {
    setClassId(Number(e.target.value));
  };

  const handleChangeWeekday = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeekdayId(Number(e.target.value));
  };

  const handleSelectAllStudent = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedHour(
      event.target.checked ? listHour.map((item) => item.id) : []
    );
  };

  const handleSelectOneStudent = (
    event: ChangeEvent<HTMLInputElement>,
    studentId: string
  ): void => {
    if (!selectedHour.includes(studentId)) {
      setSelectedHour((prevSelected) => [...prevSelected, studentId]);
    } else {
      setSelectedHour((prevSelected) =>
        prevSelected.filter((id) => id !== studentId)
      );
    }
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
    hourApiService
      .getAll(weekdayId, page, limit)
      .then((data: any) => {
        setListHour(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, [page]);

  useEffect(() => {
    hourApiService
      .getAll(weekdayId, 1, limit)
      .then((data: any) => {
        setListHour(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, [limit]);

  useEffect(() => {
    hourApiService
      .getAll(weekdayId, 1, limit)
      .then((data: any) => {
        setListHour(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, [weekdayId]);

  const handleSubmitAddStudent = () => {
    if (classId === 0) {
      toast.error(`Bạn chưa chọn lớp học.Vui lòng chọn lớp học!`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    classWeekdayApiService
      .create(selectedHour, classId)
      .then((data: any) => {
        toast.success(`Thêm lịch học thành công!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setCourseId(0);
        setClassId(0);
        setSelectedHour([]);
      })
      .catch((error: any) => {
        toast.error(`${error.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  };

  const selectedSomeHour =
    selectedHour.length > 0 && selectedHour.length < listHour.length;
  const selectedAllHour = selectedHour.length === listHour.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions handleSubmitAddStudent={handleSubmitAddStudent} />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box
              width={600}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <FormControl fullWidth variant="outlined">
                <InputLabel>Ngày trong tuần</InputLabel>
                <Select
                  value={weekdayId}
                  onChange={handleChangeWeekday}
                  label="Status"
                  autoWidth
                >
                  {listWeekday ? (
                    listWeekday.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Trống!</MenuItem>
                  )}
                  <MenuItem value={-1}>Tất cả</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ ml: 1 }} fullWidth variant="outlined">
                <InputLabel>Khóa học</InputLabel>
                <Select
                  value={courseId}
                  onChange={handleChangeCourse}
                  label="Status"
                  autoWidth
                >
                  {listCourse ? (
                    listCourse.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Không có khóa học nào!</MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl sx={{ ml: 1 }} fullWidth variant="outlined">
                <InputLabel>Lớp học</InputLabel>
                <Select
                  value={classId}
                  onChange={handleChangeClass}
                  label="Status"
                  autoWidth
                >
                  {listClass.length > 0 ? (
                    listClass.map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>
                      Không có lớp học nào thuộc khóa học này!
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
          }
          title="Danh sách học sinh"
        />
      )}
      <Divider />
      <TableContainer>
        <ToastContainer />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllHour}
                  indeterminate={selectedSomeHour}
                  onChange={handleSelectAllStudent}
                />
              </TableCell>
              <TableCell align="center">Thứ</TableCell>
              <TableCell align="center">Giờ bắt đầu</TableCell>
              <TableCell align="center">Giờ kết thúc</TableCell>
              {/* <TableCell align="center">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {listHour.map((item) => {
              const isStudentSelected = selectedHour.includes(item.id);
              return (
                <TableRow hover key={item.id} selected={isStudentSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isStudentSelected}
                      onChange={(event) =>
                        handleSelectOneStudent(event, item.id)
                      }
                      value={isStudentSelected}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.time}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{item.from_hour}</TableCell>
                  <TableCell align="center">{item.to_hour}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {listHour.length > 0 ? (
        <Box p={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Pagination
            count={utils.getTotalPage(totalRecord, limit)}
            variant="outlined"
            color="primary"
            onChange={handleChangePagination}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Số trang</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={limit}
              label="Số trang"
              onChange={handleChangeLimit}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Box p={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Empty />
        </Box>
      )}
    </Card>
  );
};

export default RecentOrdersTable;

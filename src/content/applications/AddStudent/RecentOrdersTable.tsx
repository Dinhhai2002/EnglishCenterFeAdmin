import { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import courseApiService from 'src/services/API/CourseApiService';
import classAdminApiService from 'src/services/API/Admin/ClassAdminApiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Filters {
  status?: CryptoOrderStatus;
}

const RecentOrdersTable = () => {
  const [selectedUserCourse, setSelectedUserCourse] = useState<string[]>([]);
  const selectedBulkActions = selectedUserCourse.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [listCourse, setListCourse] = useState([]);
  const [courseId, setCourseId] = useState<number>(Number(0));
  const [listClass, setListClass] = useState([]);
  const [classId, setClassId] = useState<number>(Number(0));
  const [listStudent, setListStudent] = useState([]);

  useEffect(() => {
    courseApiService
      .getAll()
      .then((data: any) => {
        setListCourse(data.data);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    courseApiService
      .getListClassById(courseId)
      .then((data: any) => {
        setListClass(data.data);
      })
      .catch((error: any) => {});

    courseApiService
      .getListStudentById(courseId)
      .then((data: any) => {
        setListStudent(data.data);
      })
      .catch((error: any) => {});
  }, [courseId]);

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {};
  const handleChangeCourse = (e: ChangeEvent<HTMLInputElement>): void => {
    setCourseId(Number(e.target.value));
  };
  const handleChangeClass = (e: ChangeEvent<HTMLInputElement>): void => {
    setClassId(Number(e.target.value));
  };

  const handleSelectAllStudent = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedUserCourse(
      event.target.checked ? listStudent.map((item) => item.id) : []
    );
  };

  const handleSelectOneStudent = (
    event: ChangeEvent<HTMLInputElement>,
    studentId: string
  ): void => {
    if (!selectedUserCourse.includes(studentId)) {
      setSelectedUserCourse((prevSelected) => [...prevSelected, studentId]);
    } else {
      setSelectedUserCourse((prevSelected) =>
        prevSelected.filter((id) => id !== studentId)
      );
    }
  };

  const handleSubmitAddStudent = () => {
    if (classId === 0) {
      toast.error(`Bạn chưa chọn lớp học.Vui lòng chọn lớp học!`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      return;
    }

    classAdminApiService
      .addStudent(Number(classId), selectedUserCourse)
      .then((data: any) => {
        toast.success(`Thêm thành công!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setCourseId(0);
        setClassId(0);
        setSelectedUserCourse([]);
      })
      .catch((error: any) => {});
  };

  const selectedSomeStudent =
    selectedUserCourse.length > 0 &&
    selectedUserCourse.length < listStudent.length;
  const selectedAllStudent = selectedUserCourse.length === listStudent.length;
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
                <InputLabel>Khóa học</InputLabel>
                <Select
                  value={courseId}
                  onChange={handleChangeCourse}
                  label="Status"
                  autoWidth
                >
                  {listCourse.length > 0 ? (
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
                    listClass.map((item) => (
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
                  checked={selectedAllStudent}
                  indeterminate={selectedSomeStudent}
                  onChange={handleSelectAllStudent}
                />
              </TableCell>
              <TableCell align="center">Mã học sinh</TableCell>
              <TableCell align="center">Tên học sinh</TableCell>
              {/* <TableCell align="center">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {listStudent.map((item) => {
              const isStudentSelected = selectedUserCourse.includes(item.id);
              return (
                <TableRow hover key={item.id} selected={isStudentSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isStudentSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
                      {item.student_id}
                    </Typography>
                  </TableCell>

                  <TableCell align="center"> {item.student_name}</TableCell>
                  {/* <TableCell align="center">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}></Box>
    </Card>
  );
};

export default RecentOrdersTable;

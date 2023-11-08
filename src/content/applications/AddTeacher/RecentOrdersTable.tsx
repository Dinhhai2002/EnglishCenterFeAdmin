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
import userAdminApiService from 'src/services/API/Admin/UserAdminApiService';



const RecentOrdersTable = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<string[]>([]);
  const selectedBulkActions = selectedTeacher.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [listClass, setListClass] = useState([]);
  const [classId, setClassId] = useState<number>(Number(0));
  const [listTeacher, setListTeacher] = useState([]);

  useEffect(() => {
    classAdminApiService
      .getAllNoLimit()
      .then((data: any) => {
        setListClass(data.data);
      })
      .catch((error: any) => {});

    userAdminApiService
      .getAll('', 1, 2, 0, 1000)
      .then((data: any) => {
        setListTeacher(data.data.list);
      })
      .catch((error: any) => {});
  }, []);

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {};

  const handleChangeClass = (e: ChangeEvent<HTMLInputElement>): void => {
    setClassId(Number(e.target.value));
  };

  const handleSelectAllStudent = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTeacher(
      event.target.checked ? listTeacher.map((item) => item.id) : []
    );
  };

  const handleSelectOneStudent = (
    event: ChangeEvent<HTMLInputElement>,
    studentId: string
  ): void => {
    if (!selectedTeacher.includes(studentId)) {
      setSelectedTeacher((prevSelected) => [...prevSelected, studentId]);
    } else {
      setSelectedTeacher((prevSelected) =>
        prevSelected.filter((id) => id !== studentId)
      );
    }
  };

  const handleSubmitAddTeacher = () => {
    if (classId === 0) {
      toast.error(`Bạn chưa chọn lớp học.Vui lòng chọn lớp học!`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      return;
    }

    if (selectedTeacher.length >= 2) {
      toast.error(`Chỉ được chọn duy nhất 1 giáo viên cho 1 lớp học!`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      return;
    }

    console.log(selectedTeacher[0]);

    classAdminApiService
      .addTeacher(classId, selectedTeacher[0])
      .then((data: any) => {
        toast.success(`Thêm thành công!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setClassId(0);
        setSelectedTeacher([]);
      })
      .catch((error: any) => {});
  };

  const selectedSomeTeacher =
    selectedTeacher.length > 0 && selectedTeacher.length < listTeacher.length;
  const selectedAllTeacher = selectedTeacher.length === listTeacher.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions handleSubmitAddTeacher={handleSubmitAddTeacher} />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box
              width={300}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
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
                  checked={selectedAllTeacher}
                  indeterminate={selectedSomeTeacher}
                  onChange={handleSelectAllStudent}
                />
              </TableCell>
              <TableCell align="center">Mã giáo viên</TableCell>
              <TableCell align="center">Tên giáo viên</TableCell>
              {/* <TableCell align="center">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {listTeacher.map((item) => {
              const isStudentSelected = selectedTeacher.includes(item.id);
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
                      {item.id}
                    </Typography>
                  </TableCell>

                  <TableCell align="center"> {item.full_name}</TableCell>
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

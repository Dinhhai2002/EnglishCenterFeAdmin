import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';

import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';
import examApiService from 'src/services/API/ExamApiService';
import { getStatusLabel, labelTableExamOverview } from 'src/utils/LabelTable';

const RecentOrdersTableExam = () => {
  const [listExam, setListExam] = useState([]);

  useEffect(() => {
    examApiService
      .getAll(-1, -1, '', 0, 10)
      .then((data: any) => {
        setListExam(data.data.list);
      })
      .catch((error: any) => {});
  }, []);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card>
      <CardHeader
        action={
          <Box
            width={600}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          ></Box>
        }
        title="DANH SÁCH ĐỀ THI MỚI NHẤT"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* map label bảng */}
              {labelTableExamOverview.map((item: any) => (
                <TableCell align="center" key={item.id}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listExam &&
              listExam.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent value={item.name} />
                    <TableCellComponent value={item.topic_name} />
                    <TableCellComponent value={item.time_minutes} />
                    <TableCellComponent value={item.total_question} />
                    <TableCellComponent value={item.total_user} />

                    <TableCell align="center">
                      {getStatusLabel(item.status, 'Hoạt động', 'Tạm khóa')}
                    </TableCell>
                    {/* Dialog */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrdersTableExam;

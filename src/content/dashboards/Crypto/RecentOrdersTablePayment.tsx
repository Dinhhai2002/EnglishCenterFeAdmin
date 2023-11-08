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
import paymentApiService from 'src/services/API/PaymentApiService';
import { getStatusLabel, labelTablePaymentHistory } from 'src/utils/LabelTable';
import utils from 'src/utils/Utils';

const RecentOrdersTablePayment = () => {
  const [listPayment, setListPayment] = useState([]);

  useEffect(() => {
    paymentApiService
      .getAll(-1, 1, 0, 10)
      .then((data: any) => {
        setListPayment(data.data.list);
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
        title="LỊCH SỬ THANH TOÁN GẦN ĐÂY"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* map label bảng */}
              {labelTablePaymentHistory.map((item: any) => (
                <TableCell align="center" key={item.id}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listPayment &&
              listPayment.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    <TableCellComponent value={item.id} />
                    <TableCellComponent value={item.course_name} />
                    <TableCellComponent value={item.student_name} />
                    <TableCellComponent
                      position="right"
                      value={utils.formatMoney(item.amount) + ' đ'}
                    />
                    <TableCellComponent value={item.payment_date + ' phút'} />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrdersTablePayment;

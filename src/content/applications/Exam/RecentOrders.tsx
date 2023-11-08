import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import examApiService from 'src/services/API/ExamApiService';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listExam, setListExam] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  useEffect(() => {
    examApiService
      .getAll(-1, -1, '', 0, 10)
      .then((data: any) => {
        setListExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    examApiService
      .getAll(-1, -1, '', 0, 10)
      .then((data: any) => {
        setListExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, [changeData]);

  const onClickPagination = (
    topic: number,
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    examApiService
      .getAll(topic, statusValue, valueSearch, page, limit)
      .then((data: any) => {
        setListExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  return (
    <Card>
      <RecentOrdersTable
        listExam={listExam}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

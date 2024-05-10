import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import examApiService from 'src/services/API/ExamApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listExam, setListExam] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const fetchExam = async (
    topicExamId: number,
    status: number,
    keySearch: string,
    page: number,
    limit: number
  ) => {
    const data = examApiService
      .getAll(topicExamId, status, keySearch, page, limit)
      .then((data: any) => {
        setListExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    fetchExam(-1, StatusEnum.ALL, '', PAGE_DEFAULT, LIMIT_DEFAULT);
  }, []);

  useEffect(() => {
    fetchExam(-1, StatusEnum.ALL, '', PAGE_DEFAULT, LIMIT_DEFAULT);
  }, [changeData]);

  const onClickPagination = (
    topic: number,
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    fetchExam(topic, statusValue, valueSearch, page, limit);
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

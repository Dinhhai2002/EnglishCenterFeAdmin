import { Card, Skeleton } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import categoryExamAdminApiService from 'src/services/API/Admin/CategoryExamAdminApiService';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }: any) {
  const [listCategoryExam, setListCategoryExam] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  useEffect(() => {
    categoryExamAdminApiService
      .getAll('', -1, 1, 10)
      .then((data: any) => {
        setListCategoryExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    categoryExamAdminApiService
      .getAll('', -1, 1, 10)
      .then((data: any) => {
        setListCategoryExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, [changeData]);

  const onClickPagination = (
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    categoryExamAdminApiService
      .getAll(valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListCategoryExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  return (
    <Card>
      <RecentOrdersTable
        listCategoryExam={listCategoryExam}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

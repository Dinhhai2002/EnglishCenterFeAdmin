import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import categoryExamAdminApiService from 'src/services/API/Admin/CategoryExamAdminApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }: any) {
  const [listCategoryExam, setListCategoryExam] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const fetchCategoryExam = (
    valueSearch: string,
    statusValue: number,
    page: number,
    limit: number
  ) => {
    categoryExamAdminApiService
      .getAll(valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListCategoryExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    fetchCategoryExam('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, []);

  useEffect(() => {
    fetchCategoryExam('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, [changeData]);

  const onClickPagination = (
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    fetchCategoryExam(valueSearch, statusValue, page, limit);
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

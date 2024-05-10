import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import categoryCourseAdminApiService from 'src/services/API/Admin/CategoryCourseAdminApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }: any) {
  const [listCategoryCourse, setListCategoryCourse] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const fetchCategoryCourse = (
    valueSearch: string,
    statusValue: number,
    page: number,
    limit: number
  ) => {
    categoryCourseAdminApiService
      .getAll(valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListCategoryCourse(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    fetchCategoryCourse('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, []);

  useEffect(() => {
    fetchCategoryCourse('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, [changeData]);

  const onClickPagination = (
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    fetchCategoryCourse(valueSearch, statusValue, page, limit);
  };

  return (
    <Card>
      <RecentOrdersTable
        listCategoryCourse={listCategoryCourse}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

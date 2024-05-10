import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import courseAdminApiService from 'src/services/API/Admin/CourseAdminApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listCourse, setListCourse] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ
  const fetchCourse = (
    valueSearch: string,
    statusValue: number,
    page: number,
    limit: number
  ) => {
    courseAdminApiService
      .getAll(valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListCourse(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    fetchCourse('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, []);

  useEffect(() => {
    fetchCourse('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, [changeData]);

  const onClickPagination = (
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    fetchCourse(valueSearch, statusValue, page, limit);
  };

  if (!dataLoaded) {
    return (
      <div>
        <Skeleton animation="wave" />
      </div>
    );
  }

  return (
    <Card>
      <RecentOrdersTable
        listCourse={listCourse}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

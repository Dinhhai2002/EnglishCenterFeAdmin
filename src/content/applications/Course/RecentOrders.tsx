import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import courseAdminApiService from 'src/services/API/Admin/CourseAdminApiService';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listCourse, setListCourse] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  useEffect(() => {
    courseAdminApiService
      .getAll('', -1, 1, 10)
      .then((data: any) => {
        setListCourse(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    courseAdminApiService
      .getAll('', -1, 1, 10)
      .then((data: any) => {
        setListCourse(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  }, [changeData]);

  const onClickPagination = (
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {

    courseAdminApiService
      .getAll(valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListCourse(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
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

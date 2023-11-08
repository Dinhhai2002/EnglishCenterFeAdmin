import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import lessonsApiService from 'src/services/API/LessonsApiService';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listLessons, setListLessons] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  useEffect(() => {
    lessonsApiService
      .getAll(-1, -1, '', -1, 0, 10)
      .then((data: any) => {
        setListLessons(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    lessonsApiService
      .getAll(-1, -1, '', -1, 0, 10)
      .then((data: any) => {
        setListLessons(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  }, [changeData]);

  const onClickPagination = (
    course: number,
    chapter: number,
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    // console.log(page, statusValue);

    lessonsApiService
      .getAll(course, chapter, valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListLessons(data.data.list);
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
        listLessons={listLessons}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

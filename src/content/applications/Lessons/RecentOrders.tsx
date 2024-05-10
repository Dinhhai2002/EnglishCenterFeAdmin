import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import lessonsApiService from 'src/services/API/LessonsApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listLessons, setListLessons] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ
  const fetchLessons = (
    course: number,
    chapter: number,
    valueSearch: string,
    statusValue: number,
    page: number,
    limit: number
  ) => {
    lessonsApiService
      .getAll(course, chapter, valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListLessons(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    fetchLessons(-1, -1, '', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, []);

  useEffect(() => {
    fetchLessons(-1, -1, '', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, [changeData]);

  const onClickPagination = (
    course: number,
    chapter: number,
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    fetchLessons(course, chapter, valueSearch, statusValue, page, limit);
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

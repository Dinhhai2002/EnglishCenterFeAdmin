import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import chapterApiService from 'src/services/API/ChapterApiService';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listChapter, setListChapter] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  useEffect(() => {
    chapterApiService
      .getAll(-1, '', -1, 1, 0, 10)
      .then((data: any) => {
        setListChapter(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    chapterApiService
      .getAll(-1, '', -1, 1, 0, 10)
      .then((data: any) => {
        setListChapter(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  }, [changeData]);

  const onClickPagination = (
    course: number,
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    // console.log(page, statusValue);

    chapterApiService
      .getAll(course, valueSearch, statusValue, 1, page, limit)
      .then((data: any) => {
        setListChapter(data.data.list);
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
        listChapter={listChapter}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

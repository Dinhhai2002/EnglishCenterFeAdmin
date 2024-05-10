import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import chapterApiService from 'src/services/API/ChapterApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listChapter, setListChapter] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  const fetchData = (
    course: number,
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    chapterApiService
      .getAll(course, valueSearch, statusValue, 1, page, limit)
      .then((data) => {
        setListChapter(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  useEffect(() => {
    fetchData(-1, '', PAGE_DEFAULT, LIMIT_DEFAULT, StatusEnum.ALL);
  }, []);

  useEffect(() => {
    fetchData(-1, '', PAGE_DEFAULT, LIMIT_DEFAULT, StatusEnum.ALL);
  }, [changeData]);

  const onClickPagination = (
    course: number,
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    fetchData(course, valueSearch, page, limit, statusValue);
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

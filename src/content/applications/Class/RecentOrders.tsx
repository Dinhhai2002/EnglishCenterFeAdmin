import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import classAdminApiService from 'src/services/API/Admin/ClassAdminApiService';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [listClass, setListClass] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  useEffect(() => {
    classAdminApiService
      .getAll('', -1, 0, 100)
      .then((data: any) => {
        setListClass(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error: any) => {});
  }, []);

  const onClickPagination = (
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    classAdminApiService
      .getAll(valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListClass(data.data.list);
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
        listClass={listClass}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

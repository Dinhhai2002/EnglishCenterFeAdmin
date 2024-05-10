import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import authenticationApiService from 'src/services/API/AuthenticationApiService';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listBlog, setListBlog] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  const fetchData = () => {
    authenticationApiService
      .getAllPost(-1, '', 2, 0, 10)
      .then((data) => {
        setListBlog(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [changeData]);

  const onClickPagination = (
    categoryBlog: number,
    valueSearch: string,
    statusValue: number,
    page: number,
    limit: number
  ) => {
    authenticationApiService
      .getAllPost(categoryBlog, valueSearch, statusValue, page, limit)
      .then((data: any) => {
        setListBlog(data.data.list);
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
        listBlog={listBlog}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

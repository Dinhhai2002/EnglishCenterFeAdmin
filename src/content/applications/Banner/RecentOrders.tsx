import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import authenticationApiService from 'src/services/API/AuthenticationApiService';
import bannerApiService from 'src/services/API/BannerApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listBanner, setListBanner] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  const fetchData = () => {
    bannerApiService
      .getAll(StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT)
      .then((data) => {
        setListBanner(data.data.list);
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
    statusValue: number,
    page: number,
    limit: number
  ) => {
    bannerApiService
      .getAll(statusValue, page, limit)
      .then((data: any) => {
        setListBanner(data.data.list);
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
        listBanner={listBanner}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

import { Card, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import authenticationApiService from 'src/services/API/AuthenticationApiService';
import promotionApiService from 'src/services/API/PromotionApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import { RecentOrdersTable } from './RecentOrdersTable';

function RecentOrders({ changeData }) {
  const [listPromotion, setListPromotion] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [dataLoaded, setDataLoaded] = useState(false); // Biến cờ

  const fetchData = (
    valueSearch: string,
    statusValue: number,
    page: number,
    limit: number
  ) => {
    promotionApiService
      .getAll(valueSearch, statusValue, page, limit)
      .then((data) => {
        setListPromotion(data.data.list);
        setTotalRecord(data.data.total_record);
        setDataLoaded(true);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchData('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, []);

  useEffect(() => {
    fetchData('', StatusEnum.ALL, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, [changeData]);

  const onClickPagination = (
    valueSearch: string,
    statusValue: number,
    page: number,
    limit: number
  ) => {
    fetchData(valueSearch, statusValue, page, limit);
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
        listPromotion={listPromotion}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import userAdminApiService from 'src/services/API/Admin/UserAdminApiService';

function RecentOrders() {
  const [listUser, setListUser] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  useEffect(() => {
    userAdminApiService
      .getAll('', -1,-1, 1, 10)
      .then((data: any) => {
        setListUser(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, []);

  const onClickPagination = (
    valueSearch: string,
    page: number,
    limit: number,
    statusValue: number
  ) => {
    // console.log(page, statusValue);

    userAdminApiService
      .getAll(valueSearch, statusValue,-1, page, limit)
      .then((data: any) => {
        setListUser(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  return (
    <Card>
      <RecentOrdersTable
        listUser={listUser}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default RecentOrders;

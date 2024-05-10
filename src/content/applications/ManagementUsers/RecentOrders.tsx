import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import userAdminApiService from 'src/services/API/Admin/UserAdminApiService';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/utils/Constant';
import { StatusEnum } from 'src/utils/enum/StatusEnum';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [listUser, setListUser] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  useEffect(() => {
    userAdminApiService
      .getAll('', StatusEnum.ALL, -1, PAGE_DEFAULT, LIMIT_DEFAULT)
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
    userAdminApiService
      .getAll(valueSearch, statusValue, -1, page, limit)
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

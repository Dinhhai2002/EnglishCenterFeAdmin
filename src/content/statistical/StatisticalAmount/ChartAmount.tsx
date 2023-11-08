import { Box, Button, IconButton } from '@mui/material';
import Chart from 'react-apexcharts';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';
import styles from './StatisticalExam.module.scss';

import WeekPicker from '../chartWeek';
import ChartMonth from '../ChartMonth';
import ChartDate from '../ChartDate';
import { useEffect, useLayoutEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ChartYear from '../ChartYear';
import statisticalApiService from 'src/services/API/Admin/StatisticalApiService';
import ReactApexChart from 'react-apexcharts';
import utils from 'src/utils/Utils';

const cx = classNames.bind(styles);

function ChartAmount({ type }: any) {
  const [dateStart, setDateStart] = useState('');
  const [listData, setListData] = useState([]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    statisticalApiService
      .Amount(
        1,
        dayjs(new Date()).format('DD/MM/YYYY'),
        dayjs(new Date()).format('DD/MM/YYYY'),
        type
      )
      .then((data: any) => {
        setListData(data.data);
      })
      .catch((error: any) => {});
  }, []);

  // cập nhật list dữ liệu
  useEffect(() => {
    const newCategory = [];
    const newData = [];
    listData.forEach((x) => {
      newCategory.push(x.date);

      newData.push(Number(x.totalAmount));
    });
    setCategory(newCategory);
    setData(newData);
  }, [listData]);

  useEffect(() => {
    state.options.xaxis.categories = category;
    state.series[0].data = data;
  }, [category, data]);

  const state = {
    options: {
      chart: {
        id: 'basic-bar'
      },

      xaxis: {
        categories: category
      }
    },
    series: [
      {
        name: 'Doanh thu',
        color: '#5569ff',
        data: data
      }
    ],
    dataLabels: {
      enabled: false
    }
  };

  const getDate = (data: any) => {
    setDateStart(data);
  };

  const formattedDate = dayjs(dateStart).format('DD/MM/YYYY');
  const weekNumber = dayjs(dateStart).isoWeek();

  const handleSubmitSearch = () => {
    statisticalApiService
      .Amount(weekNumber, formattedDate, formattedDate, Number(type))
      .then((data: any) => {
        setListData(data.data);
      })
      .catch((error: any) => {});
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 4
        }}
        className={cx('content')}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: 4
          }}
        >
          {type == 1 && <ChartDate getDate={getDate} />}
          {type == 2 && <WeekPicker getDate={getDate} />}
          {type == 3 && <ChartMonth getDate={getDate} />}
          {type == 4 && <ChartYear getDate={getDate} />}
        </Box>

        <Button
          sx={{ mt: { xs: 2, md: 0, marginLeft: 10 } }}
          variant="contained"
          startIcon={<SearchIcon fontSize="small" />}
          onClick={handleSubmitSearch}
        >
          Tìm kiếm
        </Button>
      </Box>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        width="80%"
      />
    </>
  );
}

export default ChartAmount;

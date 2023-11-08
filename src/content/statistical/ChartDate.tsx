import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { useEffect, useState } from 'react';

function ChartDate({ getDate }: any) {
  const [dateStart, setDateStart] = useState('');

  useEffect(() => {
    getDate(dateStart);
  }, [dateStart]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Chọn ngày bắt đầu"
            value={dateStart}
            onChange={(newValue: any) => setDateStart(newValue)}
            views={['year', 'month', 'day']}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}

export default ChartDate;

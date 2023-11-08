import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { useEffect, useState } from 'react';

export default function ChartMonth({ getDate }: any) {
  const [dateStart, setDateStart] = useState('');

  useEffect(() => {
    getDate(dateStart);
  }, [dateStart]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Chọn tháng"
            value={dateStart}
            onChange={(newValue: any) => setDateStart(newValue)}
            views={['year', 'month']}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}

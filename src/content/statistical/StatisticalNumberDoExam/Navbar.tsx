import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, Grid, Tab, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import ChartNumberDoExam from './ChartNumberDoExam';
import ChartExam from './ChartNumberDoExam';

function Navbar() {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {}, []);

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Theo ngày" value="1" />
              <Tab label="Theo tuần" value="2" />
              <Tab label="Theo tháng" value="3" />
              <Tab label="Theo năm" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ChartNumberDoExam type={value} />
          </TabPanel>
          <TabPanel value="2">
            <ChartNumberDoExam type={value} />
          </TabPanel>
          <TabPanel value="3">
            <ChartNumberDoExam type={value} />
          </TabPanel>
          <TabPanel value="4">
            <ChartNumberDoExam type={value} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
export default Navbar;

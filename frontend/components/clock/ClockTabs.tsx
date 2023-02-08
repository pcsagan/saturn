import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Timers from 'components/clock/Timers';
import Stopwatch from '@/components/clock/Stopwatch';
import Alarms from 'components/clock/Alarms';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`clock-tabpanel-${index}`}
      aria-labelledby={`clock-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `clock-tab-${index}`,
    'aria-controls': `clock-tabpanel-${index}`,
  };
}

export default function ClockTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='clock tabs'
          variant='fullWidth'
        >
          <Tab label='Timers' icon={<HourglassEmptyIcon />} {...a11yProps(0)} />
          <Tab
            label='Stopwatch'
            icon={<TimerOutlinedIcon />}
            {...a11yProps(1)}
          />
          <Tab label='Alarms' icon={<AccessAlarmIcon />} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Timers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stopwatch />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Alarms />
      </TabPanel>
    </Box>
  );
}

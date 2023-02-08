import NextLink from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InputIcon from '@mui/icons-material/Input';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SidebarList() {
  return (
    <List component='nav'>
      <ListItemButton component={NextLink} href='/dashboard'>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemButton>
      <ListItemButton component={NextLink} href='/clock'>
        <ListItemIcon>
          <AccessTimeIcon />
        </ListItemIcon>
        <ListItemText primary='Clock' />
      </ListItemButton>
      <ListItemButton component={NextLink} href='/input'>
        <ListItemIcon>
          <InputIcon />
        </ListItemIcon>
        <ListItemText primary='Add Data' />
      </ListItemButton>
      <ListItemButton component={NextLink} href='/calendar'>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary='Calendar' />
      </ListItemButton>
      <ListItemButton component={NextLink} href='/charts'>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Charts' />
      </ListItemButton>
      <ListItemButton component={NextLink} href='/settings'>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItemButton>
      <ListItemButton component={NextLink} href='/account'>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary='Account' />
      </ListItemButton>
    </List>
  );
}

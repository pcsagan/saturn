import NextLink from 'next/link';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';

export default function NotificationsBadge() {
  return (
    <IconButton component={NextLink} href='/notifications' color='inherit'>
      <Badge badgeContent={4} color='secondary'>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

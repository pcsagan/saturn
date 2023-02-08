import AlertNotification from '@/components/notifications/AlertNotification';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

export default function NotificationList() {
  return (
    <>
      <AlertNotification severity='error' icon={<HourglassEmptyIcon />}>
        This is an error alert — check it out!
      </AlertNotification>
      <AlertNotification severity='warning' icon={<AccessAlarmIcon />}>
        This is a warning alert — check it out!
      </AlertNotification>
      <AlertNotification severity='info' icon={<TimerOutlinedIcon />}>
        This is an info alert — check it out!
      </AlertNotification>
      <AlertNotification severity='success' icon={<AccessAlarmIcon />}>
        This is a success alert — check it out!
      </AlertNotification>
    </>
  );
}

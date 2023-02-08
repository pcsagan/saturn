import Alert, { AlertColor } from '@mui/material/Alert';

type AlertNotificationProps = {
  children?: React.ReactNode;
  severity: AlertColor;
  icon: React.ReactNode;
};

const AlertNotification = (props: AlertNotificationProps) => {
  return (
    <Alert
      variant='outlined'
      severity={props.severity}
      sx={{ m: 1 }}
      icon={props.icon}
    >
      {props.children}
    </Alert>
  );
};

export default AlertNotification;

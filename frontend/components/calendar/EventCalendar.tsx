import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

export default function EventCalendar() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const renderWeekPickerDay = (
    date: Dayjs,
    selectedDates: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>
  ) => {
    if (date.isSame(dayjs('2023-01-15'), 'day')) {
      return (
        <PickersDay
          {...pickersDayProps}
          sx={{ backgroundColor: 'green' }}
          showDaysOutsideCurrentMonth={true}
        />
      );
    }
    return (
      <PickersDay {...pickersDayProps} showDaysOutsideCurrentMonth={true} />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        openTo='day'
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

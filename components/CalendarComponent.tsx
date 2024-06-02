import React from 'react';
import { Calendar } from 'react-native-calendars';

type DayPressEvent = {
  day: number;
  month: number;
  year: number;
  timestamp: number;
  dateString: string;
};

const CalendarComponent: React.FC = () => {
  const handleDayPress = (day: DayPressEvent) => {
    console.log('selected day', day);
  };

  return (
    <Calendar
      onDayPress={handleDayPress}
      markedDates={{
        '2024-06-02': { selected: true, marked: true, selectedColor: 'blue' },
        '2024-06-16': { marked: true },
        '2024-06-21': { marked: true, dotColor: 'red', activeOpacity: 0 },
        '2024-06-28': { disabled: true, disableTouchEvent: true },
      }}
    />
  );
};

export default CalendarComponent;

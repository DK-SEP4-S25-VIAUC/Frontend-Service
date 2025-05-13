import React from 'react';
import GraphCalendarDisplay from './GraphCalenderDisplay';
import useCalendar from '../../hooks/useCalender';

export default function CalendarCard() {

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const initialRange = [yesterday, today];

  const { range, handleChange } = useCalendar(initialRange);

  return (
    <div>
      <GraphCalendarDisplay range={range} onChange={handleChange} />
    </div>
  );
}

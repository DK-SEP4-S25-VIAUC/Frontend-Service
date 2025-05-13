import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calender.css';

export default function GraphCalendarDisplay({ range, onChange }) {
  const [start, end] = range;
  const today = new Date();

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto p-4 bg-white rounded-2xl shadow text-center">
      <h4 className="mb-4 text-sm sm:text-base text-gray-800 break-words">
        {start.toDateString()} - {end.toDateString()}
      </h4>

      <div className="w-full overflow-x-hidden">
        <Calendar
          selectRange
          onChange={onChange}
          value={range}
          maxDate={today}
          className="w-full"
        />
      </div>
    </div>
  );
}

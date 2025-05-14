import React from 'react';
import GraphCalendarDisplay from './GraphCalenderDisplay';

export default function CalendarModal({ onClose, range, setRange }) {

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-start sm:justify-center z-50 px-2">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl p-4 overflow-y-auto max-h-[90vh] relative mx-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <GraphCalendarDisplay range={range} onChange={setRange} />
      </div>
    </div>
  );
}
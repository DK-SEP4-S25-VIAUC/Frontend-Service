import { useState } from 'react';

export default function useCalendar(initialRange = [new Date(), new Date()]) {
  const [range, setRange] = useState(initialRange);

  const handleChange = newRange => {
    setRange(newRange);
  };

  return { range, handleChange };
}

import { useState, useEffect } from 'react';

export function useDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);

    return () => clearInterval(id);
  });

  return date;
}

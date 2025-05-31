import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">✨ Selecciona Fecha</h2>
      <Calendar 
        inline
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.value)}
        minDate={new Date()}
        className="w-full"
      />
    </div>
  );
};

export default DateSelector; 
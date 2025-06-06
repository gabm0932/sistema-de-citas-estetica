import React from 'react';
import { Calendar } from 'primereact/calendar';

const DateStep = ({ fecha, siguientePaso }) => {
  return (
    <div className="flex justify-content-center">
      <Calendar 
        value={fecha}
        onChange={e => siguientePaso('fecha', e.value)}
        inline
        minDate={new Date()}
        className="custom-calendar w-full md:w-30rem"
      />
    </div>
  );
};

export default DateStep; 
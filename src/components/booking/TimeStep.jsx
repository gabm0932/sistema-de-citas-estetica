import React from 'react';
import { Button } from 'primereact/button';

const horarios = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

const TimeStep = ({ siguientePaso }) => {
  return (
    <div className="flex flex-wrap justify-content-center gap-2">
      {horarios.map(hora => (
        <Button 
          key={hora}
          className="p-3 border-round-2xl w-8rem"
          onClick={() => siguientePaso('hora', hora)}
        >
          {hora}
        </Button>
      ))}
    </div>
  );
};

export default TimeStep; 
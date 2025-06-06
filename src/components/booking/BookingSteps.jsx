import React from 'react';
import { Steps } from 'primereact/steps';

const pasos = [
  { label: 'Servicio', icon: 'pi pi-scissors' },
  { label: 'Fecha', icon: 'pi pi-calendar' },
  { label: 'Hora', icon: 'pi pi-clock' },
  { label: 'Datos', icon: 'pi pi-user' }
];

const BookingSteps = ({ pasoActual, setPasoActual }) => {
  return (
    <Steps 
      model={pasos}
      activeIndex={pasoActual}
      onSelect={setPasoActual}
      className="mb-4"
    />
  );
};

export default BookingSteps; 
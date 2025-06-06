import React from 'react';
import { Button } from 'primereact/button';

const servicios = [
  { nombre: 'Corte Básico ✂️', precio: '$200' },
  { nombre: 'Corte y Peinado 💇', precio: '$350' },
  { nombre: 'Servicio Completo 💅', precio: '$500' }
];

const ServiceStep = ({ siguientePaso }) => {
  return (
    <div className="flex flex-wrap justify-content-center gap-3">
      {servicios.map(servicio => (
        <Button 
          key={servicio.nombre}
          className="p-3 border-round-2xl w-12rem md:w-15rem"
          onClick={() => siguientePaso('servicio', servicio.nombre)}
        >
          {servicio.nombre} - {servicio.precio}
        </Button>
      ))}
    </div>
  );
};

export default ServiceStep; 
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Steps } from 'primereact/steps';
import Header from '../../components/Header';
import './BookingPage.css';

  const services = [
  { name: 'Corte Básico ✂️', price: '$200' },
  { name: 'Corte y Peinado 💇', price: '$350' },
  { name: 'Servicio Completo 💅', price: '$500' }
  ];

const initialData = { service: '', date: null, time: '', nombre: '', telefono: '' };

const BookingPage = () => {
  const [step, setStep] = useState(0);           
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');

  const handleNext = (key, value) => {
    setData({...data, [key]: value});
    setError('');
    if (step < 3) setStep(step + 1);
  };

  const validate = () => {
    if (!data.service || !data.date || !data.time || !data.nombre || !data.telefono) {
      setError('Por favor complete todos los campos');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setData(initialData);
    setStep(0);
    setError('');
  };

  const steps = [
    {
      label: 'Servicio',
      content: (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {services.map(s => (
            <Button 
              key={s.name} 
              className="p-3 rounded-2xl" 
              style={{ minWidth: '200px' }}
              onClick={() => handleNext('service', s.name)}
            >
              {s.name} - {s.price}
            </Button>
          ))}
        </div>
      )
    },
    {
      label: 'Fecha', 
      content: (
        <div className="w-full" style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar 
            value={data.date} 
            onChange={e => handleNext('date', e.value)} 
            inline 
            minDate={new Date()} 
            className="custom-calendar" 
          />
        </div>
      )
    },
    {
      label: 'Hora', 
      content: (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {['9:00','10:00','11:00','12:00','16:00','17:00'].map(t => (
            <Button 
              key={t} 
              className="p-3 rounded-2xl" 
              onClick={() => handleNext('time', t)}
            >
              {t}
            </Button>
          ))}
        </div>
      )
    },
    {
      label: 'Datos', 
      content: (
        <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
          <InputText 
            placeholder="Nombre *" 
            value={data.nombre} 
            onChange={e => setData({...data, nombre: e.target.value})} 
            className="w-full"
          />
          <InputText 
            placeholder="Teléfono *" 
            value={data.telefono} 
            onChange={e => setData({...data, telefono: e.target.value})} 
            className="w-full"
          />
          {error && <small className="text-red-500">{error}</small>}
          <div className="w-full">
            <Button 
              className="mt-2" 
              onClick={() => {
                if (validate()) {
                  alert(
`Cita confirmada:
Servicio: ${data.service}
Fecha: ${data.date?.toLocaleDateString()}
Hora: ${data.time}
Nombre: ${data.nombre}
Teléfono: ${data.telefono}`
                  );
                  resetForm();
                }
              }}
            >
              Confirmar
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <Card className="shadow-lg">
          <Steps model={steps} activeIndex={step} onSelect={setStep} className="mb-4" />
          <div className="p-3" style={{ display: 'flex', justifyContent: 'center' }}>
            {steps[step].content}
          </div>
          {step > 0 && <Button text onClick={() => setStep(step - 1)}>Atrás</Button>}
        </Card>
      </div>
    </div>
  );
};

export default BookingPage; 
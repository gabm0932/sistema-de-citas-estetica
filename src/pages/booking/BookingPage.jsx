import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Header from '../../components/Header';
import './BookingPage.css';

const services = [
  { name: 'Corte Básico ✂️', price: '$200' },
  { name: 'Corte y Peinado 💇', price: '$350' },
  { name: 'Servicio Completo 💅', price: '$500' }
];

const hours = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

const BookingPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ service: '', date: null, time: '', nombre: '', telefono: '' });
  const [error, setError] = useState('');
  const toast = useRef(null);

  const handleNext = (key, value) => {
    setData({...data, [key]: value});
    setError('');
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = () => {
    if (Object.values(data).some(value => !value)) {
      setError('Por favor complete todos los campos');
      return;
    }
    toast.current.show({
      severity: 'success',
      summary: '¡Cita Agendada!',
      detail: `Servicio: ${data.service}\nFecha: ${data.date?.toLocaleDateString()}\nHora: ${data.time}`,
      life: 5000
    });
    setData({ service: '', date: null, time: '', nombre: '', telefono: '' });
    setStep(0);
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
          {hours.map(t => (
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <InputText 
              placeholder="Nombre *" 
              value={data.nombre} 
              onChange={e => setData({...data, nombre: e.target.value})} 
              style={{ flex: 1, minWidth: '400px', height: '40px' }}
            />
            <InputText 
              placeholder="Teléfono *" 
              value={data.telefono} 
              onChange={e => setData({...data, telefono: e.target.value})} 
              style={{ flex: 1, minWidth: '400px', height: '40px' }}
            />
            <Button onClick={handleSubmit} style={{ minWidth: '120px', height: '40px' }}>Confirmar</Button>
          </div>
          {error && <small className="text-red-500">{error}</small>}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast ref={toast} />
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
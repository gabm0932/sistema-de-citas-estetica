import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Steps } from 'primereact/steps';
import Header from '../../components/Header';

function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    service: '',
    date: null,
    time: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const steps = [
    { label: 'Servicio' },
    { label: 'Fecha' },
    { label: 'Hora' },
    { label: 'Datos' }
  ];

  const services = [
    { name: 'Corte Básico', duration: '20 min', icon: '✂️' },
    { name: 'Corte y Peinado', duration: '40 min', icon: '💇' },
    { name: 'Servicio Completo', duration: '60 min', icon: '✨' }
  ];

  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

  const handleUpdate = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    alert('¡Reserva enviada con éxito!');
      setFormData({
      service: '',
      date: null,
      time: '',
      firstName: '',
      lastName: '',
      phone: ''
      });
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen flex flex-column surface-ground">
      <Header />
      <div className="flex align-items-center justify-content-center p-4">
        <Card className="w-full md:w-8 lg:w-6">
          <Steps
            model={steps}
            activeIndex={currentStep}
            onSelect={(e) => setCurrentStep(e.index)}
            className="mb-4"
            readOnly={false}
          />

          {currentStep === 0 && (
            <div className="flex flex-column gap-2">
              {services.map(service => (
        <Button 
          key={service.name}
                  className="p-3 flex align-items-center"
                  onClick={() => handleUpdate('service', service.name)}
                  severity={formData.service === service.name ? "primary" : "secondary"}
                >
                  <span className="text-2xl mr-2">{service.icon}</span>
                  <div className="flex flex-column align-items-start">
                    <span className="font-bold">{service.name}</span>
                    <small className="text-gray-500">{service.duration}</small>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex flex-column align-items-center">
        <Calendar 
          inline
                value={formData.date}
                onChange={(e) => handleUpdate('date', e.value)}
          minDate={new Date()}
          className="w-full"
                showWeek={false}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid">
              {timeSlots.map(slot => (
                <div key={slot} className="col-12 md:col-6">
        <Button 
                    label={slot}
                    onClick={() => handleUpdate('time', slot)}
                    severity={formData.time === slot ? "primary" : "secondary"}
                    className="p-3 w-full"
          icon="pi pi-clock"
        />
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-column gap-3">
              <span className="p-float-label">
                <InputText
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full"
                />
                <label htmlFor="firstName">Nombre</label>
              </span>

              <span className="p-float-label">
                <InputText
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full"
                />
                <label htmlFor="lastName">Apellido</label>
              </span>

              <span className="p-float-label">
              <InputText
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  keyfilter="num"
                className="w-full"
                />
                <label htmlFor="phone">Teléfono</label>
              </span>

              <Button
                label="Confirmar Reserva"
                icon="pi pi-check"
                onClick={handleSubmit}
                disabled={!formData.firstName || !formData.lastName || !formData.phone}
                className="mt-3"
                severity="success"
              />
            </div>
          )}

          <div className="flex justify-content-between mt-4">
            {currentStep > 0 && (
              <Button
                label="Atrás"
                icon="pi pi-arrow-left"
                onClick={() => setCurrentStep(currentStep - 1)}
                severity="secondary"
                text
              />
            )}
            <div className="flex-grow-1"></div>
            {currentStep < 3 && formData[Object.keys(formData)[currentStep]] && (
            <Button 
                label="Siguiente"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => setCurrentStep(currentStep + 1)}
            />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BookingPage; 
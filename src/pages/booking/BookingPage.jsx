import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import Header from '../../components/Header';

function BookingPage() {
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    servicio: null,
    fecha: null,
    hora: null,
    nombre: '',
    apellido: '',
    telefono: ''
  });

  const services = [
    { name: 'Corte Básico', duration: '20 min' },
    { name: 'Corte y Peinado', duration: '40 min' },
    { name: 'Servicio Completo', duration: '60 min' }
  ];

  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

  const handleSelect = (field, value, nextStep) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActiveIndex(nextStep);
  };

  const handleSubmit = () => {
    toast.current.show({
      severity: 'success',
      summary: '¡Reserva Enviada!',
      detail: 'Tu reserva ha sido registrada exitosamente.',
      life: 3000
    });

    setTimeout(() => {
      setFormData({
        servicio: null,
        fecha: null,
        hora: null,
        nombre: '',
        apellido: '',
        telefono: ''
      });
      setActiveIndex(0);
    }, 1000);
  };

  const accordionItems = [
    {
      icon: 'scissors',
      title: formData.servicio?.name || '1. Elige tu Servicio',
      disabled: false,
      content: services.map(service => (
        <Button 
          key={service.name}
          label={`${service.name} (${service.duration})`}
          onClick={() => handleSelect('servicio', service, 1)}
          severity={formData.servicio?.name === service.name ? "primary" : "secondary"}
          className="w-full p-3 m-2"
          icon="pi pi-clock"
        />
      ))
    },
    {
      icon: 'calendar',
      title: formData.fecha?.toLocaleDateString() || '2. Elige la Fecha',
      disabled: !formData.servicio,
      content: (
        <Calendar 
          inline
          value={formData.fecha}
          onChange={(e) => handleSelect('fecha', e.value, 2)}
          minDate={new Date()}
          className="w-full"
        />
      )
    },
    {
      icon: 'clock',
      title: formData.hora || '3. Elige el Horario',
      disabled: !formData.fecha,
      content: timeSlots.map(time => (
        <Button 
          key={time}
          label={time}
          onClick={() => handleSelect('hora', time, 3)}
          severity={formData.hora === time ? "primary" : "secondary"}
          className="w-full p-3 m-2"
          icon="pi pi-clock"
        />
      ))
    },
    {
      icon: 'user',
      title: '4. Datos de Contacto',
      disabled: !formData.hora,
      content: (
        <>
          {['nombre', 'apellido', 'telefono'].map(field => (
            <span key={field} className="p-float-label m-2 block">
              <InputText
                id={field}
                value={formData[field]}
                onChange={(e) => handleSelect(field, e.target.value, 3)}
                className="w-full"
                keyfilter={field === 'telefono' ? 'num' : null}
              />
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            </span>
          ))}
          <div className="flex justify-content-end mt-4">
            <Button 
              label="Enviar Reserva" 
              icon="pi pi-send"
              onClick={handleSubmit}
              disabled={!formData.nombre || !formData.apellido || !formData.telefono}
            />
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-column surface-ground">
      <Toast ref={toast} />
      <Header />
      <div className="flex align-items-center justify-content-center flex-grow-1">
        <Card className="w-full md:w-8 lg:w-6 m-3 shadow-2">
          <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            {accordionItems.map((item, index) => (
              <AccordionTab
                key={index}
                header={
                  <div className="flex align-items-center">
                    <i className={`pi pi-${item.icon} mr-2`}></i>
                    <span>{item.title}</span>
                  </div>
                }
                disabled={item.disabled}
              >
                <div className="grid">
                  {item.content}
                </div>
              </AccordionTab>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
}

export default BookingPage; 
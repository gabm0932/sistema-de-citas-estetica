import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Header from '../../components/Header';

function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const services = [
    { name: 'Corte Básico', duration: '20 min' },
    { name: 'Corte y Peinado', duration: '40 min' },
    { name: 'Servicio Completo', duration: '60 min' }
  ];

  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

  return (
    <div className="min-h-screen flex flex-column">
      <Header />
      <Card className="m-0">
        <Accordion>
          <AccordionTab 
            header={selectedService?.name || "1. Elige tu Servicio"}
          >
            <div className="grid">
              {services.map(service => (
                <div key={service.name} className="col-12 md:col-4">
                  <Button 
                    label={`${service.name} (${service.duration})`}
                    onClick={() => setSelectedService(service)}
                    severity={selectedService?.name === service.name ? "primary" : "secondary"}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </AccordionTab>

          <AccordionTab 
            header={selectedDate?.toLocaleDateString() || "2. Elige la Fecha"}
            disabled={!selectedService}
          >
            <Calendar 
              inline
              value={selectedDate}
              onChange={e => setSelectedDate(e.value)}
              minDate={new Date()}
            />
          </AccordionTab>

          <AccordionTab 
            header={selectedTime || "3. Elige el Horario"}
            disabled={!selectedDate}
          >
            <div className="grid">
              {timeSlots.map(time => (
                <div key={time} className="col-12 md:col-4">
                  <Button 
                    label={time}
                    onClick={() => setSelectedTime(time)}
                    severity={selectedTime === time ? "primary" : "secondary"}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </AccordionTab>
        </Accordion>
      </Card>
    </div>
  );
}

export default BookingPage; 
import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Header from '../../components/Header';
import NotificationToast from '../../components/NotificationToast';
import BookingSteps from '../../components/booking/BookingSteps';
import ServiceStep from '../../components/booking/ServiceStep';
import DateStep from '../../components/booking/DateStep';
import TimeStep from '../../components/booking/TimeStep';
import PersonalDataStep from '../../components/booking/PersonalDataStep';
import './BookingPage.css';

// Lista de servicios disponibles
const servicios = [
  { nombre: 'Corte Básico ✂️', precio: '$200' },
  { nombre: 'Corte y Peinado 💇', precio: '$350' },
  { nombre: 'Servicio Completo 💅', precio: '$500' }
];

// Horarios disponibles
const horarios = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00'];

const BookingPage = () => {
  // Estado para guardar la información del formulario
  const [pasoActual, setPasoActual] = useState(0);
  const [formulario, setFormulario] = useState({
    servicio: '',
    fecha: null,
    hora: '',
    nombre: '',
    telefono: ''
  });
  const [error, setError] = useState('');

  // Referencia para mostrar notificaciones
  const notificacion = useRef(null);

  // Función para mostrar mensaje de éxito
  const mostrarMensajeExito = () => {
    notificacion.current.show({
      severity: 'success',
      summary: '¡Cita Agendada!',
      detail: `Servicio: ${formulario.servicio}\nFecha: ${formulario.fecha?.toLocaleDateString()}\nHora: ${formulario.hora}`,
      life: 5000
    });
  };

  // Función para avanzar al siguiente paso
  const siguientePaso = (campo, valor) => {
    setFormulario({...formulario, [campo]: valor});
    setError('');
    if (pasoActual < 3) setPasoActual(pasoActual + 1);
  };

  // Función para enviar el formulario
  const enviarFormulario = () => {
    if (Object.values(formulario).some(valor => !valor)) {
      setError('Por favor complete todos los campos');
      return;
    }
    mostrarMensajeExito();
    setFormulario({ servicio: '', fecha: null, hora: '', nombre: '', telefono: '' });
    setPasoActual(0);
  };

  // Función para mostrar el contenido de cada paso
  const mostrarContenidoPaso = (paso) => {
    switch(paso) {
      case 0:
        return <ServiceStep siguientePaso={siguientePaso} />;
      case 1:
        return <DateStep fecha={formulario.fecha} siguientePaso={siguientePaso} />;
      case 2:
        return <TimeStep siguientePaso={siguientePaso} />;
      case 3:
        return (
          <PersonalDataStep 
            formulario={formulario}
            setFormulario={setFormulario}
            enviarFormulario={enviarFormulario}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationToast toastRef={notificacion} />
      <Header />
      <div className="container mx-auto p-3">
        <Card className="shadow-2">
          <BookingSteps 
            pasoActual={pasoActual}
            setPasoActual={setPasoActual}
          />
          <div className="p-3">
            {mostrarContenidoPaso(pasoActual)}
          </div>
          {pasoActual > 0 && (
            <div className="flex justify-content-start">
              <Button 
                text
                onClick={() => setPasoActual(pasoActual - 1)}
              >
                Atrás
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BookingPage; 


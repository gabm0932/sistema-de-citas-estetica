import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const PersonalDataStep = ({ formulario, setFormulario, enviarFormulario, error }) => {
  return (
    <div className="flex flex-column gap-3">
      <div className="flex flex-column md:flex-row gap-3">
        <InputText 
          placeholder="Nombre *"
          value={formulario.nombre}
          onChange={e => setFormulario({...formulario, nombre: e.target.value})}
          className="w-full"
        />
        <InputText 
          placeholder="Teléfono *"
          value={formulario.telefono}
          onChange={e => setFormulario({...formulario, telefono: e.target.value})}
          className="w-full"
        />
        <Button 
          onClick={enviarFormulario}
          className="w-full md:w-auto"
        >
          Confirmar
        </Button>
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default PersonalDataStep; 
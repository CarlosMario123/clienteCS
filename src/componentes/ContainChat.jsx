import useWebSocket from '../hooks/useWebSocket';
import InputB from './Input';
import Burbuja from './Burbuja';
import { useState } from 'react';

export default function ContainChat() {
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const { mensajes, enviarMensaje } = useWebSocket('ws://localhost:3000');

  const handleEnviarMensaje = () => {
    enviarMensaje(nuevoMensaje);
    setNuevoMensaje('');
  };

  return (
    <div className="shadow bg-slate-100 w-96 h-[31rem] shadow-primary rounded-md flex flex-col py-2 px-1">
      <h1 className='w-full text-2xl font-black text-center'>Chat</h1>
      <div className='flex flex-col justify-end w-full h-full py-1 overflow-y-auto'>
        {mensajes.map((mensaje, index) => (
          <Burbuja key={index} mensaje={mensaje.mensaje} posicion={mensaje.posicion} />
        ))}
      </div>
      <InputB value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} onEnviar={handleEnviarMensaje} />
    </div>
  );
}

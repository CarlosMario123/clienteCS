
import useWebSocket from '../hooks/useWebSocket';
import InputB from './Input';
import Burbuja from './Burbuja';
import { useState } from 'react';

export default function ContainChat() {
  let toki = localStorage.getItem("token");
  const url = 'ws://localhost:4000'; // Reemplaza con la URL de tu servidor WebSocket
  const [token, setToken] = useState(toki); // Supongamos que tienes el token almacenado en el estado
  const { mensajes, enviarMensaje } = useWebSocket(url,token);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const handleEnviarMensaje = () => {
    console.log(toki)
    enviarMensaje(nuevoMensaje);
    setNuevoMensaje('');
  };

  return (
    <div className="shadow bg-slate-100 w-96 h-[31rem] shadow-primary rounded-md flex flex-col py-2 px-1">
      <h1 className='font-black text-2xl w-full text-center'>Chat</h1>
      <div className='w-full h-full flex flex-col justify-end py-1 overflow-y-auto'>
        {mensajes.map((mensaje, index) => (
          <Burbuja key={index} mensaje={mensaje.mensaje} posicion={mensaje.posicion} />
        ))}
      </div>
      <InputB value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} onEnviar={handleEnviarMensaje} />
    </div>
  );
}

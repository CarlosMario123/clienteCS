import useWebSocket from '../hooks/useWebSocket';
import InputB from './Input';
import Burbuja from './Burbuja';
import { useState, useEffect } from 'react';

export default function ContainChat({token}) {
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  let tokenParseado = JSON.stringify(token).slice(1, -1);
  console.log("parseado",tokenParseado)
  const [url, setUrl] = useState(`ws://localhost:3000`);
  const { mensajes, enviarMensaje } = useWebSocket(url,token);




 

  const handleEnviarMensaje = () => {
    console.log(token);
    enviarMensaje(nuevoMensaje);
    setNuevoMensaje('');
  };

  // Wait for the token to be loaded before rendering the component
  if (token === null || url === '') {
    return <div>Loading...</div>;
  }

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



import { useState, useEffect } from 'react';

const useWebSocket = (url, token) => {
  const [webSocket, setWebSocket] = useState(null);
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    // Verificar si ya existe una conexión WebSocket antes de crear una nueva
    if (!webSocket) {
      const socket = new WebSocket(url, token);

      socket.addEventListener('open', () => {
        console.log('Conectado al servidor WebSocket');
        setWebSocket(socket);
      });

      socket.addEventListener('message', (event) => {
        const mensaje = JSON.parse(event.data);

        // Utiliza una función callback en setMensajes para garantizar que estás obteniendo el estado más reciente.
        setMensajes((prevMensajes) => {
          // Verifica si el mensaje ya existe en el estado antes de agregarlo.
          const mensajeExistente = prevMensajes.find((m) => m.mensaje === mensaje.texto);

          if (!mensajeExistente) {
            return [...prevMensajes, { mensaje: mensaje.texto, posicion: false }];
          }

          return prevMensajes;
        });
      });

      // Manejar el cierre del componente
      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };
    }
  }, [url, token, webSocket]);

  const enviarMensaje = (nuevoMensaje) => {
    if (webSocket && nuevoMensaje.trim() !== '') {
      setMensajes((prevMensajes) => [...prevMensajes, { mensaje: nuevoMensaje, posicion: true }]);
      webSocket.send(JSON.stringify({ texto: nuevoMensaje }));
    }
  };

  return {
    webSocket,
    mensajes,
    enviarMensaje,
  };
};

export default useWebSocket;

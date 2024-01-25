import { useState, useEffect } from 'react';

const useWebSocket = (url, token) => {
  const [webSocket, setWebSocket] = useState(null);
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    // Verificar si ya existe una conexión WebSocket antes de crear una nueva
    if (!webSocket) {
      const socket = new WebSocket(url);

      socket.onopen = (event) => {
        console.log("cliente conectado al servidor ws");
        setWebSocket(socket);
      };

      socket.onmessage = (event) => {
        const mensaje = JSON.parse(event.data).texto;

        // Utiliza una función de retorno en setMensajes para garantizar que estás obteniendo el estado más reciente.
        setMensajes((prevMensajes) => {
          // Verifica si el mensaje ya existe en el estado antes de agregarlo.
          const mensajeExistente = prevMensajes.find((m) => m.mensaje === mensaje);

          if (!mensajeExistente) {
            return [...prevMensajes, { mensaje: mensaje, posicion: false }];
          }

          return prevMensajes;
        });
      };

      // Manejar el cierre del componente fuera del onopen
      socket.onclose = (event) => {
        console.log("se cerro la conexion al ws");
      };
    }
  }, [url, webSocket]);

  const enviarMensaje = (nuevoMensaje) => {
    if (webSocket) {
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

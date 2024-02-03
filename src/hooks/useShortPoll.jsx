import { useEffect, useState } from 'react';

const useShortPollingWithWrite = (url, interval = 1000) => {
  const [contenidoActual, setContenidoActual] = useState('');

  const obtenerActualizacion = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const actualizacion = await response.json();
      setContenidoActual(actualizacion.pizarra);
    } catch (error) {
      console.error('Error al obtener actualización:', error);
    }
  };

  const handleChangeContenido = (nuevoContenido) => {
    setContenidoActual(nuevoContenido);
    // Envía automáticamente el nuevo contenido al servidor
    enviarContenido(nuevoContenido);
  };

  const enviarContenido = async (contenido) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contenido }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al enviar contenido:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(obtenerActualizacion, interval);

    return () => clearInterval(intervalId);
  }, [url, interval]);

  return {
    contenidoActual,
    handleChangeContenido,
  };
};

export default useShortPollingWithWrite;

import { useState, useEffect } from 'react';

// Hook personalizado para manejar localStorage
export const useLocalStorage = (key) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      // Obtener el valor inicial de localStorage
      const storedValue = localStorage.getItem(key);
      return storedValue ? storedValue : null;
    } catch (error) {
      // Si hay algún error al leer localStorage, regresar null
      console.error('Error al leer localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          // Actualizar el valor cuando cambie el localStorage
          const newValue = event.newValue ? JSON.parse(event.newValue) : null;
          setLocalStorageValue(newValue);
        } catch (error) {
          console.error('Error al actualizar localStorage:', error);
        }
      }
    };

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Limpiar el evento cuando el componente se desmonta
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  const updateLocalStorageValue = (newValue) => {
    try {
      // Actualizar el valor de localStorage y el estado
      setLocalStorageValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error al actualizar localStorage:', error);
    }
  };

  // Devolver el valor actualizado de localStorage y la función para actualizarlo
  return { localStorageValue, updateLocalStorageValue };
};

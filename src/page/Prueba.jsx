// ChatRoom.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChatRoom = ({ socket }) => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Al montarse el componente, unirse automáticamente a la sala
    socket.emit('chat:join', roomName);

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      socket.emit('chat:leave', roomName);
    };
  }, [socket, roomName]);

  // Manejar el envío de un nuevo mensaje
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('chat:send', { room: roomName, message: newMessage });
      setNewMessage('');
    }
  };

  // Manejar la recepción de un nuevo mensaje
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, { user: data.user, message: data.message }]);
    };

    socket.on('chat:message', handleReceiveMessage);

    return () => {
      socket.off('chat:message', handleReceiveMessage);
    };
  }, [socket]);

  // Manejar la salida de la sala y navegación a /home
  const handleLeaveRoom = () => {
    socket.emit('chat:leave', roomName);
    navigate('/home');
  };

  return (
    <div className="max-w-3xl p-4 mx-auto mt-10 border rounded-lg shadow-md">
      <h2 className="mb-4 text-3xl font-bold">Sala de Chat: {roomName}</h2>

      <div className="mb-4 overflow-y-auto max-h-96">
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold text-blue-500">{msg.user}:</span> {msg.message}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-2 mr-2 border rounded-l-lg focus:outline-none"
        />
        <button onClick={handleSendMessage} className="p-2 text-white bg-blue-500 rounded-r-lg">
          Enviar
        </button>
        <button onClick={handleLeaveRoom} className="p-2 ml-2 text-white bg-red-500 rounded-lg">
          Salir de la sala
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;

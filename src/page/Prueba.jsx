// src/App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); 

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat:message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    socket.on("chat:system", (systemMessage) => {
      setChat((prevChat) => [...prevChat, { systemMessage }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinRoom = () => {
    socket.emit("chat:join", room);
  };

  const handleLeaveRoom = () => {
    socket.emit("chat:leave", room);
  };

  const handleSendMessage = () => {
    socket.emit("chat:send", { room, user: username, message });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 text-black bg-blue-500">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="p-2 mr-2"
        />
        <button onClick={handleJoinRoom} className="p-2 text-gray-800 bg-gray-300">
          Unirme a una sala
        </button>
        <button onClick={handleLeaveRoom} className="p-2 ml-2 text-white bg-red-500">
          Salir de la sala
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {chat.map((item, index) => (
          <div key={index} className="mb-2">
            {item.user && (
              <div>
                <strong>{item.user}:</strong> {item.message}
              </div>
            )}
            {item.systemMessage && <div className="italic">{item.systemMessage}</div>}
          </div>
        ))}
      </div>
      <div className="p-4 text-white bg-blue-500">
        <input
          type="text"
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 mr-2 text-black"
        />
        <button onClick={handleSendMessage} className="p-2 text-white bg-green-500">
          Enviar mensaje
        </button>
      </div>
    </div>
  );
}

export default Chat;

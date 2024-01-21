import React from 'react'

export default function Burbuja({mensaje,posicion}) {
  return (
    <div className={`chat ${posicion ? "chat-start":"chat-end"}`}>
    <div className="chat-bubble chat-bubble-info">{mensaje}</div>
  </div>
  )
}

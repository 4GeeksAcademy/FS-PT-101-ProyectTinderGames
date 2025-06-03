import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../../findGames.css";
import logo from "../../assets/img/icons/icon-IA.png"

export const FindGames = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! Soy la IA de FindGames. ¿En qué puedo ayudarte?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    const ref = chatScrollRef.current;
    if (ref != null){
        ref.scrollTop = ref.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const respuesta = await axios.post(
        `${BACKEND_URL}/api/chat`,
        { message: text },
        { headers: { "Content-Type": "application/json" } }
      );

      if (respuesta.data.reply) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: respuesta.data.reply }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Lo siento, algo salió mal con la IA." }
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error de conexión con el servidor." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page-container">
      <div className="chat-header">
        <h1>FindGames Chat</h1>
      </div>

      <div className="chat-messages-container" ref={chatScrollRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-row ${
              msg.sender === "user" ? "message-user" : "message-bot"
            }`}
          >
            {msg.sender === "bot" && (
              <img src={logo} alt="IA Logo" className="message-avatar" />
            )}
            <div className="message-content">{msg.text}</div>
          </div>
        ))}

        {/* Spinner mientras la IA "piensa" */}
        {isLoading && (
          <div className="message-row message-bot">
            <img src={logo} alt="IA Logo" className="message-avatar" />
            <div className="spinner" />
          </div>
        )}
      </div>

      <form className="chat-input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>
          {isLoading ? "⌛" : "Enviar"}
        </button>
      </form>
    </div>
  );
};

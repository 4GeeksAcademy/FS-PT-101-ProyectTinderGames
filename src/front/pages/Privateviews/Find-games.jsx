import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../../findGames.css";
import logo from "../../assets/img/icons/icon-IA.png";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const FindGames = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm PlayerLink AI. I'm here to recommend new games and answer any other game-related questions. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (!store.user) navigate("/");
  }, [store.user]);

  useEffect(() => {
    const ref = chatScrollRef.current;
    if (ref) ref.scrollTop = ref.scrollHeight;
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userInfo = store.user?.profile
      ? (() => {
        const { name, age, games } = store.user.profile;
        const juegosStr = Array.isArray(games)
          ? games.map((item) => item.gameTitle).join(", ")
          : "sin juegos";
        return `Nombre: ${name}, Edad: ${age}, Juegos: ${juegosStr}`;
      })()
      : "the user has no data";

    // Nuevo mensaje del usuario (todavía no está en el estado)
    const updatedMessages = [...messages, { sender: "user", text }];

    // Mostramos inmediatamente en la UI
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const respuesta = await axios.post(
        `${BACKEND_URL}/api/chat`,
        { messages: updatedMessages, userInfo },
        { headers: { "Content-Type": "application/json" } }
      );

      const reply = respuesta.data.reply || "Lo siento, algo salió mal con la IA.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error de conexión con el servidor." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-3 position-relative">
      <div className="row justify-content-center">
        <div className="chat-container">
          <div className="border rounded-top text-center py-2 bg-gradient-header">
            <h1 className="m-0 text-white fs-5">PlayerLink's IA Chat</h1>
          </div>

          <div
            ref={chatScrollRef}
            className="flex-grow-1 overflow-auto bg-dark px-3 py-2 border rounded-bottom"
            style={{ borderLeft: "2px solid transparent", borderRight: "2px solid transparent" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                  }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={logo}
                    alt="IA Logo"
                    className="me-2"
                    style={{ width: "35px", height: "35px", objectFit: "fill" }}
                  />
                )}
                <div
                  className={`px-3 py-2 rounded-3 text-wrap message-bubble ${msg.sender === "user"
                    ? "bg-gradient-user text-white shadow-user"
                    : "bg-gradient-bot text-white shadow-bot"
                    }`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="d-flex mb-3 justify-content-start">
                <img
                  src={logo}
                  alt="IA Logo"
                  className="me-2"
                  style={{ width: "35px", height: "35px", objectFit: "fill" }}
                />
                <div className="spinner align-self-center"></div>
              </div>
            )}
          </div>

          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-white text-light"
                placeholder="Your query here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="btn btn-primary botonenviar"
                type="submit"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? "⌛" : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

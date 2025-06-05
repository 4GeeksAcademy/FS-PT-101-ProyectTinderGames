import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../../findGames.css";
import logo from "../../assets/img/icons/icon-IA.png";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const FindGames = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { store, dispatch } = useGlobalReducer();

  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! Soy la IA de FindGames. ¿En qué puedo ayudarte?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef(null);

  // Cada vez que cambian mensajes o isLoading, hacemos scroll al final
  useEffect(() => {
    const ref = chatScrollRef.current;
    if (ref) {
      ref.scrollTop = ref.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    // Construimos userInfo según store.user.profile
    const userInfo = store.user?.profile
      ? (() => {
          const { name, age, games } = store.user.profile;
          const juegosStr = Array.isArray(games)
            ? games.map((item) => item.game.title).join(", ")
            : "sin juegos";
          return `Nombre: ${name}, Edad: ${age}, Juegos: ${juegosStr}`;
        })()
      : "the user has no data";

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const respuesta = await axios.post(
        `${BACKEND_URL}/api/chat`,
        { message: text, userInfo },
        { headers: { "Content-Type": "application/json" } }
      );

      if (respuesta.data.reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: respuesta.data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Lo siento, algo salió mal con la IA." },
        ]);
      }
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
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 d-flex flex-column" style={{ height: "75vh" }}>
          {/* ---------- Header ---------- */}
          <div className="border rounded-top text-center py-2 bg-gradient-header">
            <h1 className="m-0 text-white fs-5">FindGames Chat</h1>
          </div>

          {/* ---------- Mensajes (scrollable) ---------- */}
          <div
            ref={chatScrollRef}
            className="flex-grow-1 overflow-auto bg-dark px-3 py-2 border rounded-bottom"
            style={{ borderLeft: "2px solid transparent", borderRight: "2px solid transparent" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex mb-3 ${
                  msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                {/* Si es bot, mostramos avatar */}
                {msg.sender === "bot" && (
                  <img
                    src={logo}
                    alt="IA Logo"
                    className="me-2"
                    style={{ width: "35px", height: "35px", objectFit: "fill" }}
                  />
                )}
                <div
                  className={`px-3 py-2 rounded-3 text-wrap ${
                    msg.sender === "user"
                      ? "bg-gradient-user text-white shadow-user"
                      : "bg-gradient-bot text-white shadow-bot"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Spinner mientras la IA "piensa" */}
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

          {/* ---------- Input & Botón ---------- */}
          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-white text-dark"
                placeholder="Escribe tu mensaje..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="btn btn-primary botonenviar"
                type="submit"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? "⌛" : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

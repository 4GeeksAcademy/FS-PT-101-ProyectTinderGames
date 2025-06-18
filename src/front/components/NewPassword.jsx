// src/front/pages/NewPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const NewPassword = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");  // ✅
    const { actions } = useGlobalReducer();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password !== confirm) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        const res = await actions.updatePassword(password, token);
        if (res && res.success) {
            setMessage("✅ Contraseña actualizada. Redirigiendo al login...");
            setTimeout(() => navigate("/"), 2500);
        } else {
            setMessage("❌ Error al actualizar la contraseña.");
        }
    };

    return (
        <div className="container mt-5 text-white">
            <h2>Establecer nueva contraseña</h2>
            <input
                className="form-control my-2"
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="form-control my-2"
                type="password"
                placeholder="Confirmar contraseña"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
                Cambiar contraseña
            </button>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

const actions = ({ store, dispatch }) => ({
  sendResetEmail: async (email) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/check_mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await resp.json();
      console.log("Respuesta:", data);

      if (data.success) {
        alert("✅ Correo de recuperación enviado");
      } else {
        alert("❌ " + data.msg);
      }
    } catch (err) {
      console.error("Error al enviar reset email:", err);
      alert("❌ Error de conexión con el servidor");
    }
  },

  updatePassword: async (password, token) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/password_update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await resp.json();
      console.log("🔁 updatePassword:", data);
      return data;
    } catch (err) {
      console.error("❌ Error en updatePassword:", err);
      return { success: false, msg: "Error en la solicitud" };
    }
  },
});

export default actions;

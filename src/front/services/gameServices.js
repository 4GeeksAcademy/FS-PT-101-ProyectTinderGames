const url = import.meta.env.VITE_BACKEND_URL;

const gameServices = {
  postNewGame: async (profileId, form) => {
    try {
      const resp = await fetch(`${url}/api/games/${profileId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game: {
            title: form.title,
            hours_played: form.hours_played,
          },
        }),
      });

      if (!resp.ok) {
        throw new Error("Something went wrong trying to post game info");
      }

      // Opcional: parseamos la respuesta JSON
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("postNewGame error:", error);
      throw error;
    }
  },

  deleteGameById: async (game_id) => {
    try {
      const resp = await fetch(`${url}/api/games/${game_id}`, {
        method: "DELETE",
      });

      if (!resp.ok) {
        throw new Error("Something went wrong trying to delete game");
      }
      // Opcional: parseamos la respuesta JSON
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("postNewGame error:", error);
      throw error;
    }
  },
};

export default gameServices;

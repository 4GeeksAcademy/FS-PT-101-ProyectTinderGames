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
            title: form.title,
            hours_played: form.hours_played,
            image: form.image,
          
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

  updateGameInfo: async (game_id, hours) => {
    try {
      const resp = await fetch(`${url}/api/games/hours/${game_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            hours_played: hours,
        }),
      });

      if (!resp.ok) {
        throw new Error("Something went wrong trying to update game");
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

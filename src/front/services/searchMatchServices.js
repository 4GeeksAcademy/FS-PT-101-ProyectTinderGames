const url = import.meta.env.VITE_BACKEND_URL;
const searchMatchServices = {};

// Trae la información de usuario autentificado
searchMatchServices.getUserInfo = async () => {
  try {
    const resp = await fetch(url + "/api/private", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Trae la infomación de la lista de los ususarios para usarlo en el match
searchMatchServices.getMatchProfiles = async () => {
  try {
    const resp = await fetch(url + "/api/profiles", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!resp.ok) throw Error("Failed to fetch match profiles");
    const data = await resp.json();
    console.log(data);
    localStorage.setItem("profile", JSON.stringify(data.profile));
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Trae las estrellas del usuario para mostrarlas con la media hecha
searchMatchServices.getStarsByUser = async (userId) => {
  try {
    const resp = await fetch(`${url}/api/reviews_received/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!resp.ok) throw new Error("Error getting stars");

    const data = await resp.json();
    const reviews = data.reviews_received;

    if (!Array.isArray(reviews) || reviews.length === 0) return 0;

    const total = reviews.reduce((acc, r) => acc + r.stars, 0);
    const average = total / reviews.length;

    return Math.round(average);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Manda los likes a la API del usuario logeado al usuario que se ha dado like
searchMatchServices.sendLike = async (fromUserId, toUserId) => {
  try {
    const resp = await fetch(`${url}/api/likes/${fromUserId}/${toUserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ fromUserId, toUserId }),
    });

    if (!resp.ok) throw new Error("Failed to send like");

    return await resp.json();
  } catch (error) {
    console.error(error);
    return { match: false };
  }
};

// Trae los likes recibidos por el usuario logeado
searchMatchServices.getLikesReceived = async (userId) => {
  try {
    const resp = await fetch(`${url}/api/likes_received/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!resp.ok) throw new Error("Failed to fetch likes received");

    const data = await resp.json();
    return data.likes_received || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Trae los dislikes recibidos por el usuario logeado
searchMatchServices.getDislikesReceived = async (userId) => {
  try {
    const resp = await fetch(`${url}/api/rejects_received/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!resp.ok) throw new Error("Failed to fetch dislikes received");

    const data = await resp.json();
    return data.rejects_recieved || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default searchMatchServices;

const url = import.meta.env.VITE_BACKEND_URL;
const userServices = {};

userServices.register = async (formData) => {
  try {
    const resp = await fetch(url + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

userServices.login = async (formData) => {
  try {
    const resp = await fetch(url + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

userServices.getUserInfo = async () => {
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

userServices.getUserInfoById = async (user_id) => {
  try {
    const resp = await fetch(url + `/api/users/${user_id}`, {});
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

userServices.changeUserPhoto = async (user_id, photo) => {
  try {
    const resp = await fetch(url + `/api/profiles/photo/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default userServices;

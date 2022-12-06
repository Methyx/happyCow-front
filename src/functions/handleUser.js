import Cookies from "js-cookie";
import axios from "axios";

const handleUser = async (action, user, setUser) => {
  if (action === "login") {
    // ====================
    // ====== LOGIN ========
    // ====================
    // HERE user is the object returned by back when login
    setUser({
      token: user.token,
      username: user.account.username,
      favorites: user.favorites || [],
      avatar: user.account.avatar?.secure_url || null,
    });
    Cookies.set("happyCowToken", user.token, { expires: 7 });
    Cookies.set("happyCowUser", user.account.username, { expires: 7 });
    if (user.favorites) {
      Cookies.set("happyCowFavorites", JSON.stringify(user.favorites), {
        expires: 7,
      });
    }
    return;
  } else if (action === "load") {
    // ====================
    // ====== LOAD ========
    // ====================
    // we use user.token to load all parameters of user
    // email of user is also return by this load action
    try {
      const url =
        "https://site--happycow-back--gw6mlgwnmzwz.code.run/user/read";
      // const url = "http://localhost:4000/user/read";
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      const newUser = {
        token: user.token,
        username: response.data.username,
        avatar: response.data.avatar,
        favorites: response.data.favorites,
      };
      setUser(newUser);
      Cookies.set("happyCowToken", user.token, { expires: 7 });
      Cookies.set("happyCowUser", user.username, { expires: 7 });
      if (user.favorites) {
        Cookies.set("happyCowFavorites", JSON.stringify(user.favorites), {
          expires: 7,
        });
      }
      return response.data.email;
    } catch (error) {
      console.log("handleUser - load");
      console.log(error.message);
      console.log(error.response?.data.message);
    }
  } else if (action === "save") {
    // ====================
    // ====== SAVE ========
    // ====================
    // user contains the new parameters to save
    // avatar must be "delete" if avatar of account has to be deleted
    // else avatar contains the object to upload (NOT the link)
    try {
      //   const url = "http://localhost:4000/user/update";
      const url =
        "https://site--happycow-back--gw6mlgwnmzwz.code.run/user/update";
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("username", user.username);
      if (user.avatar) {
        formData.append("modifyAvatar", true);
        if (user.avatar !== "delete") {
          formData.append("picture", user.avatar);
        }
      } else {
        formData.append("modifyAvatar", false);
      }
      console.log(user.favorites);
      formData.append("favorites", JSON.stringify(user.favorites));
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser({
        token: user.token,
        username: response.data.username,
        favorites: response.data.favorites,
        avatar: response.data.avatar,
      });
      return "ok";
    } catch (error) {
      if (error.response?.data.message) {
        return error.response.data.message;
      } else {
        return `An error occurs : ${error.message}`;
      }
    }
  } else if (action === "remove") {
    // ====================
    // ====== REMOVE ========
    // ====================
    await Cookies.remove("happyCowToken");
    await Cookies.remove("happyCowUser");
    await Cookies.remove("happyCowFavorites");
    setUser({
      token: null,
      username: null,
      favorites: null,
      avatar: null,
    });
  }
};

export default handleUser;

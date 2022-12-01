import Cookies from "js-cookie";
import axios from "axios";

const handleUser = async (action, user, setUser) => {
  if (action === "login") {
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
    // HERE user has been build with data in Cookies. We need to get avatar from backend
    // Return the email for the account page
    try {
      const url =
        "https://site--happycow-back--gw6mlgwnmzwz.code.run/user/update";
      const response = await axios.put(url, null, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      const newUser = { ...user };
      newUser.avatar = response.data.avatar;
      setUser(newUser);
      console.log("handleUser, email : ", response.data.email);
      return response.data.email;
    } catch (error) {
      console.log(error.message);
      console.log(error.response?.data.message);
    }
  } else if (action === "save") {
  } else if (action === "remove") {
    setUser({
      token: null,
      username: null,
      favorites: null,
      avatar: null,
    });
    Cookies.remove("happyCowToken");
    Cookies.remove("happyCowUser");
    Cookies.remove("happyCowFavorites");
  }
};

export default handleUser;

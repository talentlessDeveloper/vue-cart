import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const error = ref("");
  const loggedInUser = ref(
    JSON.parse(localStorage.getItem("glass-user")) ?? ""
  );
  const loggedIn = ref(localStorage.getItem("glass-token"));

  function signUp(userInfo) {
    if (!userInfo) {
      return;
    }
    const userData = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
    };

    user.value = userData;
    loggedInUser.value = userData;
    loggedIn.value = true;

    localStorage.setItem("glass-user", JSON.stringify(userData));
    localStorage.setItem("glass-token", "glasses7y387310djf");
  }

  function logOut() {
    user.value = null;
    loggedIn.value = false;
    localStorage.removeItem("glass-token");
  }

  function logIn(email, password) {
    if (!email || !password) {
      error.value = "Ensure fields aren't empty";
      console.log("empty field");
      return false;
    }
    if (!loggedInUser) {
      error.value = "Can't find User";
      console.log("user absent");
      return false;
    }

    if (
      email !== loggedInUser.value.email ||
      password !== loggedInUser.value.password
    ) {
      error.value = "Invalid login credentials";
      console.log("user dont match");
      return false;
    }

    error.value = "";
    user.value = loggedInUser.value;
    loggedIn.value = true;
    localStorage.setItem("glass-token", "glasses7y387310djf");
    return true;
  }

  return { user, signUp, logOut, logIn, loggedInUser, error, loggedIn };
});

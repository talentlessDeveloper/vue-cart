import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

export function useLoggedInUser() {
  const userStore = useUserStore();
  const { user, loggedInUser, loggedIn } = storeToRefs(userStore);

  if (loggedInUser.value && loggedIn.value) {
    user.value = loggedInUser.value;
  }

  return { user };
}

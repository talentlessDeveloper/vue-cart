import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import { computed, onMounted } from "vue";

export function useLoggedInUser() {
  const authStore = useAuthStore();
  const isAuthenticated = computed(() => !!authStore.user);
  onMounted(() => {
    authStore.initializeAuth();
  });

  return { isAuthenticated };
}

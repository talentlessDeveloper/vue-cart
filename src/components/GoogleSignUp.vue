<template>
  <button @click="signIn" type="button">
    <div><img src="../assets/g.icon.png" alt="google icon" /></div>
    Sign {{ label }} with Google
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const props = defineProps(['label']);
const router = useRouter();

const signIn = async () => {
  await authStore.signWithGoogle();
  router.push('/products');
};
</script>

<style scoped>
img {
  max-width: 100%;
  width: 30px;
  height: 30px;
  object-fit: cover;
}
button {
  background-color: var(--accentClr);
  color: var(--white);
  padding-block: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-inline: 14px;
  margin-top: 20px;
}
</style>

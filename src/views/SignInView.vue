<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import GoogleSignUp from '../components/GoogleSignUp.vue';

import { useAuthStore } from '../stores/auth';
const router = useRouter();
// const userStore = useUserStore();
const authStore = useAuthStore();

const loginData = reactive({
  email: '',
  password: '',
});

const handleLogin = async () => {
  // console.log(userStore.loggedInUser, userStore.loggedInUser.value);

  // if (userStore.logIn(loginData.email, loginData.password)) {
  //   router.push("/products");
  // }
  try {
    await authStore.signIn(loginData.email, loginData.password);
    router.push('/products');
  } catch (err) {
    console.log(err);
  }

  loginData.email = '';
  loginData.password = '';
};
</script>

<template>
  <main>
    <h2>Sign In</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          placeholder="Enter your name"
          id="email"
          required
          v-model="loginData.email"
          :class="{ error: authStore.errorF }"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          required
          placeholder="Enter your password"
          v-model="loginData.password"
          :class="{ error: authStore.errorF }"
        />
        <small>{{ authStore.error }}</small>
      </div>
      <button class="login-btn" type="submit">Login</button>
      <GoogleSignUp label="in" />
    </form>
    <div class="login">
      <p>Don't Have an account?</p>
      <button @click="router.push('/sign-up')">Sign Up</button>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 80dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

h2 {
  font-size: clamp(1.5rem, 2vw + 0.5rem, 2.5rem);
  color: var(--accentClr);
  margin-bottom: 1.5rem;
}

form {
  width: min(90%, 650px);
  margin: 0 auto;
  box-shadow: 4px 0px 8px -1px var(--accentClr);

  padding-inline: 24px;
  padding-block: 40px;
}

.form-group {
  margin-bottom: 18px;
}

input,
button {
  width: 100%;
  padding-block: 12px;
  padding-inline: 8px;
}

label {
  display: block;
  margin-bottom: 6px;
}

.login-btn {
  background-color: var(--accentClr);
  color: var(--white);
  padding-block: 12px;
  border: none;
  cursor: pointer;
}

small {
  color: tomato;
}
input.error {
  border: 1px solid tomato;
}

.login {
  display: flex;
  align-items: center;
  margin-top: 14px;
}

.login > * {
  white-space: nowrap;
}

.login > button {
  background: transparent;
  border: none;
  color: var(--accentClr);
  cursor: pointer;
}
</style>

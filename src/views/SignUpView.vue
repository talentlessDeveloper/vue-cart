<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';

import GoogleSignUp from '../components/GoogleSignUp.vue';

// const userStore = useUserStore();
const authStore = useAuthStore();

const userData = ref({
  name: '',
  email: '',
  password: '',
});
const error = ref({
  password: '',
  email: '',
  name: '',
});

const router = useRouter();

const handleSubmit = async () => {
  if (
    !userData.value.name ||
    !userData.value.email ||
    !userData.value.password
  ) {
    error.value.password = 'Ensure all fields are not  empty';
    return;
  }
  if (!validateEmail(userData.value.email)) {
    return;
  }

  if (userData.value.password.length < 6) {
    error.value.password = 'Password must be at least 6 characters';
    return;
  }

  // userStore.signUp(userData.value);
  // userStore.error = "";
  try {
    await authStore.signUp(
      userData.value.email,
      userData.value.password,
      userData.value.name
    );

    router.push('/products');
    error.value = {
      name: '',
      password: '',
      email: '',
    };
  } catch (err) {
    console.log(err.message);
  }

  userData.value.email = '';
  userData.value.name = '';
  userData.value.password = '';
  console.log(authStore.user, 'user');
};

const validateEmail = (email) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    error.value.email = '';
    return true;
  } else {
    error.value.email = 'Invalid email address';
    return false;
  }
};
</script>

<template>
  <main>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          id="name"
          required
          v-model="userData.name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          id="email"
          required
          v-model="userData.email"
          @change="validateEmail(userData.email)"
          :class="{ error: error.email }"
        />
        <small>{{ error.email }}</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="at least 6 characters"
          required
          v-model="userData.password"
          :class="{ error: error.password }"
        />
        <small>{{ error.password }}</small>
      </div>
      <button>Sign Up</button>
      <GoogleSignUp label="up" />
    </form>
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

small {
  color: tomato;
}
input.error {
  border: 1px solid tomato;
}

button {
  background-color: var(--accentClr);
  color: var(--white);
  padding-block: 12px;
  border: none;
  cursor: pointer;
}
</style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const userData = ref({
  name: "",
  email: "",
  password: "",
});
const error = ref("");

const router = useRouter();

const handleSubmit = () => {
  if (
    !userData.value.name ||
    !userData.value.email ||
    !userData.value.password
  ) {
    return;
  }
  if (!validateEmail(userData.value.email)) {
    return;
  }

  userStore.signUp(userData.value);
  userStore.error = "";
  userData.value.email = "";
  userData.value.name = "";
  userData.value.password = "";
  router.push("/products");
};

const validateEmail = (email) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    error.value = "";
    return true;
  } else {
    error.value = "Invalid email address";
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
          :class="{ error: error }"
        />
        <small>{{ error }}</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="e.g AdaLovelace?$"
          required
          v-model="userData.password"
        />
      </div>
      <button>Sign Up</button>
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

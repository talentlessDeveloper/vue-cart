<script setup>
import { useRoute } from "vue-router";
import { useLoggedInUser } from "../composable/getUser";

const { user } = useLoggedInUser();

const route = useRoute();
const props = defineProps(["openMenu", "logOut"]);
const emit = defineEmits(["close-menu"]);
const handleEmit = () => {
  emit("close-menu");
};

const handleLogOut = () => {
  props.logOut();
  emit("close-menu");
};
</script>

<template>
  <ul class="nav-menu-ul" :class="{ open: props.openMenu === true }">
    <li @click="handleEmit">
      <RouterLink to="./sign-in">Sign in</RouterLink>
    </li>
    <li @click="handleEmit">
      <RouterLink to="sign-up">Sign up</RouterLink>
    </li>
    <li @click="handleEmit">
      <RouterLink to="products">Products</RouterLink>
    </li>
    <li v-if="user">
      <button @click="handleLogOut" class="logout-btn">LogOut</button>
    </li>
  </ul>
</template>

<style scoped>
.nav-menu-ul {
  background-color: var(--accentClr);
  display: flex;
  row-gap: 48px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  height: 100dvh;
  padding-block: 48px;
  width: min(90%, 440px);
  transform: translateX(200%);
  transition: transform 400ms ease-in;
  z-index: 5;
}

.nav-menu-ul.open {
  transform: translateX(0%);
}

a {
  font-size: 2rem;
  text-decoration: none;
  color: var(--white);
}

a:hover {
  color: var(--textClr);
}

button {
  padding: 4px 29px;
  background: none;
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
}

@media (min-width: 48rem) {
  .nav-menu-ul {
    display: none;
  }
}
</style>

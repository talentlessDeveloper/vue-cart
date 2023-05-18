<script setup>
import { ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

import HeaderMenuVue from "../layout/HeaderMenu.vue";
import Avatar from "../components/Avatar.vue";

import { useLoggedInUser } from "../composable/getUser";

const authStore = useAuthStore();
const openMenu = ref(false);
const router = useRouter();

const { isAuthenticated } = useLoggedInUser();

// const username = computed(() => {
//   if (user.value.name) {
//     return user.value.name;
//   }
// });

const handleLogOut = () => {
  authStore.signOut();
  router.push("/sign-in");
};
</script>

<template>
  <header>
    <nav class="container">
      <RouterLink to="/" class="logo">
        <img src="../assets/logo.svg" alt="glasses home" />
      </RouterLink>

      <ul class="nav-ul">
        <!-- <li>
          <RouterLink to="sign-up">Sign up</RouterLink>
        </li> -->
        <li>
          <RouterLink to="products">Products</RouterLink>
        </li>

        <li v-if="isAuthenticated">
          <button @click="handleLogOut" class="logout-btn">LogOut</button>
        </li>
        <li v-else>
          <RouterLink to="/sign-in">Sign in</RouterLink>
        </li>
        <li v-show="isAuthenticated" class="avatar">
          <p>
            Hi {{ isAuthenticated ? authStore.user?.displayName || "" : "" }}
          </p>
          <Avatar />
        </li>
      </ul>
      <div class="avatar-mobile">
        <div v-show="isAuthenticated" class="avatar">
          <p :class="{ open: openMenu === true }">
            Hi {{ isAuthenticated ? authStore.user?.displayName || "" : "" }}
          </p>
          <Avatar />
        </div>

        <button
          aria-label="open menu"
          @click="openMenu = !openMenu"
          class="menu-btn"
          :class="{ open: openMenu === true }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <HeaderMenuVue
      :openMenu="openMenu"
      :logOut="handleLogOut"
      @close-menu="() => (openMenu = !openMenu)"
    />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  overflow: hidden;
}

nav {
  padding-block: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  text-decoration: none;
  font-size: 1.25rem;
}

a:hover {
  color: var(--accentClr);
}

.logo,
.menu-btn {
  position: relative;
  z-index: 9;
}

img {
  width: 4rem;
  height: 4rem;
  rotate: 12deg;
}

.nav-ul {
  display: none;
}

.menu-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.menu-btn > span {
  display: block;
  height: 2px;
  width: 28px;
  background-color: var(--accentClr);
  margin-bottom: 4px;
  transition: transform 400ms ease, opacity 300ms ease-in;
}

span:first-child {
  margin-top: 4px;
  width: 24px;
}

span:last-child {
  width: 20px;
}

.menu-btn.open span {
  background-color: #fff;
}

.menu-btn.open span:nth-child(2) {
  opacity: 0;
}
.menu-btn.open span:first-child {
  rotate: -45deg;
  transform: translateY(9px);
}
.menu-btn.open span:last-child {
  rotate: 45deg;
  transform: translateY(-10px);
}

.logout-btn {
  background: none;
  padding: 4px 8px;
  border: 1px solid var(--accentClr);
  color: var(--accentClr);
  cursor: pointer;
}
.avatar {
  display: flex;
  align-items: center;
  gap: 6px;
}

.avatar-mobile .open {
  color: var(--white);
}

.avatar-mobile {
  display: flex;
  gap: 12px;
  position: relative;
  z-index: 9;
}

@media (min-width: 48rem) {
  .nav-ul {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .avatar > p {
    text-transform: capitalize;
  }

  .menu-btn {
    display: none;
  }

  .avatar-mobile {
    display: none;
  }
}
</style>

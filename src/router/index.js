import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUpView.vue";
import SignIn from "../views/SignInView.vue";
import Header from "../layout/Header.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "header",
      component: Header,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/products",
          name: "products",
          component: () => import("../views/ProductsView.vue"),
          meta: {
            authIsRequired: true,
          },
        },
        {
          path: "/product/:productId",
          name: "product",
          component: () => import("../views/ProductView.vue"),
          meta: {
            authIsRequired: true,
          },
        },
        {
          path: "/sign-up",
          name: "sign-up",
          component: SignUp,
        },
        {
          path: "/sign-in",
          name: "sign-in",
          component: SignIn,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

// const isAuthenticated = () => localStorage.getItem("glass-token");
const isAuthenticated = () => {
  const authStore = useAuthStore();

  if (authStore.user) return true;
  return false;
};

const canUserAccess = (to) => {
  if (!isAuthenticated() && to.meta.authIsRequired && to.name !== "sign-in") {
    return false;
  }

  return true;
};

router.beforeEach(async (to, from) => {
  // const authStore = useAuthStore();
  const canAccess = await canUserAccess(to);

  if (isAuthenticated() && to.name === "sign-in") {
    return {
      name: "home",
    };
  }

  // if (isAuthenticated() && to.name === "log-out") {
  //   userStore.logOut();

  //   return {
  //     name: "sign-in",
  //   };
  // }

  if (!canAccess) {
    return {
      name: "sign-in",
    };
  }
});

export default router;

<script setup>
import { storeToRefs } from "pinia";
import LoaderVue from "../components/LoaderVue.vue";
import { useLoggedInUser } from "../composable/getUser";
import { useProductsStore } from "../stores/products";
import { useUserStore } from "../stores/user";

const productsStore = useProductsStore();
const { username } = useLoggedInUser();
const { productsData, loading } = storeToRefs(productsStore);
const userStore = useUserStore();

console.log(userStore.user, userStore.loggedInUser);

productsStore.getProducts();
</script>
<template>
  <div class="global-user">{{ username }}</div>
  <div v-if="loading">
    <LoaderVue />
  </div>
  <main v-else>
    <div class="container">
      <div class="glasses-grid">
        <div class="glass" v-for="product in productsData" :key="product.id">
          <RouterLink :to="`product/${product.id}`">
            <figure>
              <img :src="product.thumbnail" alt="" />
              <figcaption>
                <!-- <p>{{ product.brand }}</p> -->
                <p>{{ product.title }}</p>
                <p>{{ `$${product.price}` }}</p>
              </figcaption>
            </figure>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.glasses-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 24px;
  margin-block: 64px;
}
.glass > a {
  display: block;
}

.glass,
.glass > a,
.glass figure {
  width: 100%;
  aspect-ratio: 1;
}

figure {
  position: relative;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

img {
  object-fit: cover;
  max-width: 100%;
  height: 100%;
}

figcaption {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--accentClr);
  color: var(--white);
  padding: 4px 3px;
  display: flex;
  justify-content: space-between;
}

figcaption p {
  font-size: clamp(0.75rem, 1vw + 0.5rem, 1rem);
}

@media (min-width: 40rem) {
  .glasses-grid {
    grid-template-columns: repeat(3, 1fr);
    margin-block: 128px;
  }
}
</style>

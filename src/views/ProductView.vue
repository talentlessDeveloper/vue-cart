<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "../stores/product";
import { useRoute, useRouter } from "vue-router";
import LoaderVue from "../components/LoaderVue.vue";

const productStore = useProductStore();
const { product, loading } = storeToRefs(productStore);

const router = useRouter();
const { productId } = useRoute().params;

productStore.getProduct(productId);

const imageIdx = ref(0);

const changeImgIdx = (idx) => {
  imageIdx.value = idx;
};

const goback = () => {
  router.back();
};

console.log(productId);
</script>

<template>
  <div v-if="loading">
    <LoaderVue />
  </div>
  <main v-else>
    <div class="container">
      <button @click="goback" aria-label="go back" class="go-back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="64"
          height="64"
          viewBox="0,0,256,256"
          style="fill: #000000"
        >
          <g
            fill="#b6462f"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <g transform="scale(0.5,0.5)">
              <path d="M10,256l200,150v-80h156v-140h-156v-80z"></path>
              <rect x="394" y="186" width="40" height="140"></rect>
              <rect x="462" y="186" width="40" height="140"></rect>
            </g>
          </g>
        </svg>
      </button>
      <div class="grid">
        <div class="product-images">
          <img :src="product.images[imageIdx]" alt="" />
          <div class="small-images">
            <button
              v-for="(image, idx) in product.images"
              :key="image"
              @click="changeImgIdx(idx)"
            >
              <img :src="image" alt="" />
            </button>
          </div>
        </div>

        <div class="product-text">
          <div>
            <p>
              {{ product.brand }}
            </p>
            <p><span>Ratings </span>{{ product.rating }}</p>
          </div>
          <p>
            {{ product.description }}
          </p>
          <p>
            <span>Price</span> <span>${{ product.price }}</span>
          </p>
          <p>
            <span>Discount</span> <span>{{ product.discountPercentage }}%</span>
          </p>

          <p>
            <span>Stocks Available</span> <span>{{ product.stock }}</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.go-back {
  margin-top: 36px;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-block: 32px;
}

.product-images > img {
  aspect-ratio: 2 / 1;
  max-width: 100%;
}

button {
  cursor: pointer;
  border: none;
  background-color: transparent;
}

button > img {
  height: 40px;
  aspect-ratio: 1;
  object-fit: cover;
}

.small-images {
  display: flex;
  gap: 4px;
  margin-top: 12px;
}
.product-text > div {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--lightBrown);
  margin-bottom: 18px;
}

.product-text > div > p:first-child {
  font-size: 2.5rem;
  color: var(--accent-clr);
}

.product-text > p {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.product-text > p:nth-of-type(3) > span {
  display: block;
  max-width: 400px;
}

.product-text span:first-child {
  color: var(--accentClr);
  font-weight: bold;
}

@media (min-width: 40rem) {
  .grid {
    flex-direction: row;
    margin-block: 56px;
  }

  .grid > .product-text {
    flex-basis: 60%;
  }

  .grid > .product-images {
    flex-basis: 40%;
  }
}
</style>

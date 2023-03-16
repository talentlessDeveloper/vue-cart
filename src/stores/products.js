import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const productsData = ref([]);
  const loading = ref(false);

  async function getProducts() {
    try {
      loading.value = true;
      const res = await fetch("https://dummyjson.com/products/");
      const { products } = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      productsData.value = products;
      loading.value = false;
    } catch (err) {
      console.log(err);
    }
  }

  return { productsData, loading, getProducts };
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const product = ref({});
  const loading = ref(false);

  async function getProduct(id) {
    try {
      loading.value = true;
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }

      product.value = data;
      loading.value = false;
    } catch (err) {
      console.log(err);
    }
  }

  return { product, loading, getProduct };
});

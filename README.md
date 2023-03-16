# vue-cart

## Instruction

Create a newvue js application using the cli then simulate a fake authentication experience using vuex and vue router. Make sure you make provisions for wildcard routes a.k.a 404 pages. Also your fake authentication experience should consist of the login route "/login", the sign up route "/signup" and the products routes "/products" . Users shouldn't be able to access the products until they are logged in and they shouldn't be able to access the login route if they are already logged in. In this exercise I hope to see the use of nested routes for the navigation menu that will show oneach page and authguards. Bonus - extract out a composable to get currently logged in user and create a page that shows product detai;s by using this api [https://dummyjson.com/1](https://dummyjson.com/1) https://dummyjson.com/1. You can use this api [https://dummyjson.com/products](https://dummyjson.com/products)

## Hosted Link

[vue-cart](https://vue-cart-five.vercel.app/)

![Page screenshot](./src/assets/vue-cart.png)

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

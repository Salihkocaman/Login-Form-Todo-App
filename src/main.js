import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "/src/router/router";
const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .mount("#app");

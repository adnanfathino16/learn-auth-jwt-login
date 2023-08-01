import { createApp } from "vue";
import App from "./App.vue";
import Router from "./routes";

// bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

createApp(App).use(Router).mount("#app");

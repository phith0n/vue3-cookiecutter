import "./scss/tabler.scss"
import "bootstrap"
import "vue-toastification/dist/index.css";

import './network'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router.js"
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Foot from "@/components/Foot.vue";
import Pagination from "@/components/Pagination.vue";
import Toast from "vue-toastification";

const app = createApp(App)
app.use(router).use(Toast)
app.component('Sidebar', Sidebar).component('Topbar', Topbar).component('Foot', Foot)
  .component('Pagination', Pagination);

app.mount('#app');

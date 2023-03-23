import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import {createRouter, createWebHistory} from 'vue-router'
import SimpleForm from "@/views/SimpleForm.vue";
import SimpleList from "@/views/SimpleList.vue";


const routes = [
  {path: '/', name: 'dashboard', component: Dashboard},
  {path: "/login", name: 'login', component: Login},
  {path: '/form', name: 'form', component: SimpleForm},
  {path: '/list', name: 'list', component: SimpleList},
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

import { createRouter, createWebHistory } from "vue-router";
import LocalityList from "./LocalitiesList.vue";
import LocalityDetail from "./LocalityDetail.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LocalityList },
    { path: "/locality/:id", component: LocalityDetail }
  ]
});
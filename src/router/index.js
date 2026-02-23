import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "localities",
      component: () => import("@/views/LocalitiesList.vue")
    },
    {
      path: "/locality/:id",
      name: "locality-detail",
      component: () => import("@/views/LocalityDetail.vue"),
      props: true
    }
  ]
});

export default router;
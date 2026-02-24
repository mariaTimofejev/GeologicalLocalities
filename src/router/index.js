import { createRouter, createWebHistory } from "vue-router";

// Vue Router instance using HTML5 history (clean URLs without #)
const router = createRouter({
  history: createWebHistory(),

// Application routes
  routes: [
    {
      path: "/",
      name: "localities",

// Lazy-loaded view to reduce initial bundle size
      component: () => import("@/views/LocalitiesList.vue")
    },
    {
      path: "/locality/:id",
      name: "locality-detail",

// Dynamic import enables code splitting per page
      component: () => import("@/views/LocalityDetail.vue"),

// Pass route params as component props (better testability & decoupling)
      props: true
    }
  ]
});

export default router;
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      layout: "AppLayoutDefault"
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
    meta: {
      layout: "AppLayoutDefault"
    }
  },
  {
    path: "/usercolorspanel",
    name: "User Colors",
    component: () => import("@/views/UserColorsPanel.vue"),
    meta: {
      layout: "AppLayoutDefault"
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

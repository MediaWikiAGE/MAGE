import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/TabHome.vue"),
    meta: {
      layout: "AppLayoutDefault"
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/TabAbout.vue"),
    meta: {
      layout: "AppLayoutDefault"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/TabLogin.vue"),
    meta: {
      layout: "AppLayoutDefault"
    }
  },
  {
    path: "/tasks",
    name: "Task List",
    component: () => import("@/views/TabTasks.vue"),
    meta: {
      layout: "AppLayoutDefault"
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/TabSettings.vue"),
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

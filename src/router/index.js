import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import RedirectView from "@/views/RedirectView.vue";
// import ReservationView from "@/views/ReservationView.vue";
import ReservationView from "@/views/ReservationView/index.vue";
import ReservationListView from "@/views/ReservationListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/main",
      name: "main",
      component: MainView,
    },
    {
      path: "/oauth2/redirect",
      name: "redirect",
      component: RedirectView,
    },
    {
      path: "/reservation",
      name: "reservation",
      component: ReservationView,
    },
    {
      path: "/reservation/list",
      name: "reservationList",
      component: ReservationListView,
    },
    // {
    //   path: '/add',
    //   component: () => import('@/views/PostAddPage.vue'),
    //   meta: { auth: true },
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;

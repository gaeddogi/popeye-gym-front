import { createRouter, createWebHistory } from "vue-router"
import store from '@/store/store.js'
import Index from "@/views/Index/Index.vue"
import NoneHeaderIndex from "@/views/Index/NoneHeaderIndex.vue"
import AdminIndex from "@/views/Admin/Index.vue"
import LoginView from "@/views/LoginView.vue"
import MainView from "@/views/MainView.vue"
import RedirectView from "@/views/RedirectView.vue"
// import ReservationView from "@/views/ReservationView.vue"
import ReservationView from "@/views/ReservationView/index.vue"
import ReservationListView from "@/views/ReservationListView.vue"
import TrainerManageView from "@/views/Admin/TrainerManageView.vue"
import { getAuthFromCookie } from "@/utils/cookie"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Index,
      children: [
        {
          path: '/',
          name: 'main',
          component: MainView,
        },
        {
          path: '/reservation',
          name: 'reservation',
          component: ReservationView,
          meta: { 
            roles: ['ROLE_USER', 'ROLE_ADMIN'] 
          },
        },
        {
          path: '/reservation/list',
          name: 'reservationList',
          component: ReservationListView,
          meta: { 
            roles: ['ROLE_USER', 'ROLE_ADMIN'] 
          },
        },
      ]
    },
    {
      path: '/login',
      name: '',
      component: NoneHeaderIndex,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        }
      ]
    },
    {
      path: '/admin',
      name: '',
      component: AdminIndex,
      children: [
        {
          path: '/admin',
          name: 'trainerManageView',
          component: TrainerManageView,
          meta: {
            roles: ['ROLE_ADMIN']
          }
        }
      ]
    },
    // {
    //   path: '/',
    //   name: 'main',
    //   component: MainView,
    // },
    // {
    //   path: '/reservation',
    //   name: 'reservation',
    //   component: ReservationView,
    //   meta: { 
    //     roles: ['ROLE_USER', 'ROLE_ADMIN'] 
    //   },
    // },
    // {
    //   path: '/reservation/list',
    //   name: 'reservationList',
    //   component: ReservationListView,
    //   meta: { 
    //     roles: ['ROLE_USER', 'ROLE_ADMIN'] 
    //   },
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: LoginView,
    // },
    {
      path: '/oauth2/redirect',
      name: 'redirect',
      component: RedirectView,
    },
    // {
    //   path: '/main',
    //   name: 'main',
    //   component: MainView,
    // },
    // {
    //   path: '/add',
    //   component: () => import('@/views/PostAddPage.vue'),
    //   meta: { auth: true },
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.beforeEach(async (to, from, next) => {
  console.log('라우터 beforeEach', from)
  const token = getAuthFromCookie()

  if (token) {
    console.log('토큰을 가지고 있음')
    await store.dispatch('fetchUser')
  }

  const roleStatus = store.state.user.role
  if (to.meta.roles && !to.meta.roles.includes(roleStatus)) { // 권한 필요 && 권한 없음
    if (!roleStatus) next('/login')
    else if (!to.meta.roles.includes(roleStatus)) next('/')
  }
  else { // 권한 필요 없음
    next()
  }
  
  // if (to.meta.roles) { // 권한 필요
  //   const token = getAuthFromCookie()
  //   if (token) { 
  //     console.log('토큰을 가지고 있음')

  //     // store.commit('setToken', token)
  //     await store.dispatch('fetchUser')

  //     const roleStatus = store.state.user.role
  //     if (!to.meta.roles.includes(roleStatus)) { // 권한 없음
  //       next('/login')
  //       // next({
  //       //   path: "/login",
  //       //   query: { redirect: to.fullPath },
  //       // })
  //     }
  //     else { // 권한 있음
  //       console.log(from)
  //       next()
  //     }
  //   }
  //   else {
  //     next('/login')
  //   }
  // }
  // else { // 권한 필요 없음
  //   next()
  // }

})

export default router;

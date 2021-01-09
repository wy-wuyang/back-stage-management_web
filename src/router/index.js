import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index.vue"),
    children: [
      {
        path: "/",
        redirect: "/home"
      },
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Home.vue")
      },
      {
        path: "/userinfo",
        name: "userinfo",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/UserInfo")
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/InfoShow.vue")
      },
      {
        path: "/foundlist",
        name: "foundlist",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/FoundList.vue")
      }
    ]
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "*",
    name: "/404",
    component: () => import(/* webpackChunkName: "about" */ "../views/404.vue")
  }
];

const router = new VueRouter({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;

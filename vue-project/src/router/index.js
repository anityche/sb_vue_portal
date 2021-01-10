import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    //이미 로그인 유저이므로 reject
    alert("이미로긴");
    next("/");
  } else {
    next(); //path 미입력시 입장 허용
  }
};

const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    //로그인 이전이면 막음
    alert("로그인 필요");
    next("/");
  } else {
    next(); //path 미입력시 입장 허용
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    beforEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/mypage",
    name: "mypage",
    beforEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/Mypage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

export default router;

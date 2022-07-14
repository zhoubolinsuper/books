import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:"index",
    redirect: "login",
    // component: HomeView,
  },
  {
    path:'/home',
    name: "home",
    redirect: "/home/index",
    children:[
      {
        path:"/home/index",
        name:"index",
        component:()=>import("../views/Index.vue")
      },
      {
        path:"document",
        name:"document",
        component:()=>import("../views/Document.vue")
      },
      {
        path:"lead",
        name:"lead",
        component:()=>import("../views/Lead.vue")
      },

    ],
    component:()=>import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
   
    component: () =>import( "../views/AboutView.vue"),
  },
  {
    path:'/login',
    name:'login',
    component:()=>import("../views/LoginView.vue")
  }
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from,next) => {
  // 路由守卫中不要使用for循环，会陷入死循环
  if(to.name==='login'){
    // 登录界面不设权限
    next()
  }else{
    // 非登录界面设置权限
    let token = localStorage.getItem("token")
    if(token){
      // 有权限的人
      next()
    }else{
      // 没有权限
      next({name:'login'})
    }
  }
  
  next()
})

export default router;

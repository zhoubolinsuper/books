import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ELementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css

console.log(process.env)

Vue.use(ELementUI) //全局注入
Vue.config.productionTip = false;

//引入mock拦截
if(process.env.NODE_ENV ==='development'){
  require("./mock/mock")
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

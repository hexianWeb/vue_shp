import { createApp, component } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import TypeNav from "@/components/TypeNav";

// 引入全局动画组件 anmations
import "animate.css";

// 参数一 全局组件名字 参数二 WHICH一个组件
createApp(App)
  .component("TypeNav", TypeNav)
  .use(store)
  .use(router)
  .mount("#app");

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie';
import brLang from 'element-ui/lib/locale/lang/pt-br';
import money from "v-money";

Vue.config.productionTip = false

Vue.use(ElementUI,{size: Cookies.get('size'||'medium'),locale: brLang});
Vue.use(ElementUI);
Vue.use(money, {precision: 4});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

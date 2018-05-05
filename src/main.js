// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import '@/common/style/normalize.css';
import App from './App';
import router from './router';
// import './permission';


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});

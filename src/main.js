// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';
import ElementUI from 'element-ui';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'element-ui/lib/theme-default/index.css';
import '@/common/style/normalize.css';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(MuseUI);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});

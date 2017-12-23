import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

// modules
import FrontIndex from './modules/front/index';
import User from './modules/user/index';
import Admin from './modules/admin/index';
// pages

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    'front.index': FrontIndex,
    'user.index': User,
    'admin.index': Admin,
  },
});

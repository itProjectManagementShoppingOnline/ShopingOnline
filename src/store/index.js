import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

// modules
import User from './modules/user/index';
import mClient from './modules/management/client';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    'user.index': User,
    'management.client': mClient,
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

// modules
import CourseIndex from './modules/course/index';
// pages

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    'course.index': CourseIndex,
  },
});

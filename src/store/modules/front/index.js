import rest from '@/utils/rest';


const state = {
};

const getters = {
  coursesList: _state => _state.coursesList,
};

const actions = {
  fetchItemList({ commit }, payload = {}) {
    return rest({
      url: `/m/items/${payload.type}/${payload.page}/list`,
      method: 'get',
    });
  },
  fetchCourseActivityList(payload = {}) {
    return rest({
      url: `/m/course/${payload.cID}/coursecircle/activity/list`,
      method: 'get',
    });
  },
};

/* eslint no-param-reassign: 0 */
const mutations = {
  replaceCoursesList(_state, list) {
    _state.coursesList = list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import rest from '@/utils/rest';


const state = {
  coursesList: [],
};

const getters = {
  coursesList: _state => _state.coursesList,
};

const actions = {
  fetchList({ commit }, payload = {}) {
    return rest({
      url: `/m/course/${payload.type}/list`,
      method: 'get',
    }).then((resp) => {
      commit('replaceCoursesList', resp.data.data);
      // console.log(resp.data.data);
      return resp;
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

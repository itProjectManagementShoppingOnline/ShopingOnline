import rest from '@/utils/rest';

const state = {
};

const getters = {
};

const actions = {
  fetchClientList({ commit }, payload) {
    console.log(payload);
    return rest({
      url: '/api/client/list',
      method: 'get',
    });
  },
  modifyUsername({ commit }, payload) {
    console.log('modifyUsername', payload);
    return rest({
      url: '/api/common/post',
      method: 'post',
      data: {
        username: payload.username,
      },
    });
  },
};

/* eslint no-param-reassign: 0 */
const mutations = {
  setUserID(_state, id) {
    _state.userID = id;
  },
  setToken(_state, token) {
    _state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

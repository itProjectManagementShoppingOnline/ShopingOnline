import rest from '@/utils/rest';


const state = {
};

const getters = {
};

const actions = {
  fetchItemList({ commit }, payload = {}) {
    return rest({
      url: `/m/items/${payload.type}/${payload.page}/list`,
      method: 'get',
    });
  },
};

/* eslint no-param-reassign: 0 */
const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

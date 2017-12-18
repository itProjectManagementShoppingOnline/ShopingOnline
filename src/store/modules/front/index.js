import rest from '@/utils/rest';


const state = {
};

const getters = {
};

const actions = {
  fetchItemList({ commit }, payload = {}) {
    console.log('type');
    console.log(payload.type);
    return rest({
      url: `/m/items/${payload.type}/${payload.page}/list`,
      method: 'get',
    });
  },

  fetchGoodinfo({ commit }, payload = {}) {              // 获取商城某个商品的信息
    return rest({
      url: `/m/good/info/${payload.id}/list`,
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

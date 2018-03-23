import rest from '@/utils/rest';


const state = {
};

const getters = {
};

const actions = {
  fetchItemList({ commit }, payload = {}) {
    console.log('type');
    console.log(payload.type);
    if (payload.key) {
      return rest({
        url: `/api/m/items/${payload.type}/${payload.page}/${payload.key}/list`,
        method: 'get',
      });
    }
    return rest({
      url: `/api/m/items/${payload.type}/${payload.page}/list`,
      method: 'get',
    });
  },

  fetchGoodinfo({ commit }, payload = {}) {              // 获取商城某个商品的信息
    return rest({
      // url: 'http://192.168.1.175:8000/m/good/info/1/list',
      url: `http://192.168.1.175:8000/m/good/info/${payload.id}/list`,
      // url: `/m/good/info/${payload.id}/list`,
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

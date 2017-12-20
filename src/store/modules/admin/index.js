import rest from '@/utils/rest';
import { getToken, setToken } from '@/utils/auth';


const state = {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  name: '',
  roles: [],
};

const getters = {
  token: _state => _state.token,
};

const actions = {
  // signin({ commit }, payload = {}) {
  //   let code;
  //   const usernameTrimed = payload.signinForm.username.trim();
  //   const passwordTrimed = payload.signinForm.password.trim();
  //   return rest({
  //     url: '/admin/signin.post',
  //     method: 'post',
  //     data: {
  //       username: usernameTrimed,
  //       password: passwordTrimed,
  //     },
  //   }).then((resp) => {
  //     code = resp.data.code;
  //     // 成功
  //     if (code === 200) {
  //       commit('SET_TOKEN', resp.data.data.token);
  //     }
  //     return Promise.resolve(code);
  //   });
  // },
  // signOut({ commit }) {
  //   return rest({
  //     url: '/admin/signout.post',
  //     method: 'post',
  //     // params: {
  //     //   token: _state.token,
  //     // },
  //   }).then((resp) => {
  //     commit('SET_TOKEN', '');
  //     commit('SET_ROLES', []);
  //     removeToken();
  //     return Promise.resolve(resp);
  //   });
  // },
  fetchOnSaleItemList({ commit }, payload = {}) {
    return rest({
      url: '/api/m/admin/onsale/items/list/get',
      method: 'get',
      params: {
        sort: payload.sort,
      },
    });
  },
  toggleItemStatus({ commit }, payload = {}) {
    return rest({
      url: '/api/m/admin/item/status/toggle/post',
      method: 'put',
      data: {
        id: payload.iID,
      },
    });
  },
  toggleUserStatus({ commit }, payload = {}) {
    console.log(payload.uID);
    return rest({
      url: '/api/m/admin/user/status/toggle/post',
      method: 'put',
      data: {
        id: payload.uID,
      },
    });
  },
  throughOnSaleItem({ commit }, payload = {}) {
    return rest({
      url: '/api/m/admin/checkupload/fail/post',
      method: 'put',
      data: {
        id: payload.iID,
      },
    });
  },
  unThroughOnSaleItem({ commit }, payload = {}) {
    return rest({
      url: '/api/m/admin/checkupload/fail/post',
      method: 'put',
      data: {
        id: payload.iID,
      },
    });
  },
  fetchCheckUploadItemList({ commit }, payload = {}) {
    return rest({
      url: '/api/m/admin/checkupload/items/list/get',
      method: 'get',
      params: {
        sort: payload.sort,
      },
    });
  },
  fetchUserList({ commit }, payload = {}) {
    return rest({
      url: '/api/m/admin/user/list/get',
      method: 'get',
      params: {
        sort: payload.sort,
      },
    });
  },
};

/* eslint no-param-reassign: 0 */
const mutations = {
  SET_TOKEN: (_state, token) => {
    _state.token = token;
    setToken(token);
  },
  SET_ROLES: (_state, roles) => {
    state.roles = roles;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

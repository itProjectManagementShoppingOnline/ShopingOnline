import rest from '@/utils/rest';
import { setToken, getToken, removeToken } from '@/utils/auth';
import { getUserIDbyDecodeJSON } from '@/utils/decode';

const state = {
  userID: null,
  token: null,
};

const getters = {
  userID: (_state) => {
    console.log('old userID', _state.userID);
    if (_state.userID !== null) {
      return _state.userID;
    }
    // 若userID不在state中，解析JWT获得
    _state.userID = getUserIDbyDecodeJSON(getToken());
    return _state.userID;
  },
  token: (_state) => {
    if (_state.token !== null) {
      return _state.token;
    }
    return getToken();
  },
};

const actions = {
  signIn({ commit }, payload = {}) {
    console.log('signIn', payload);
    let url = '/api/client/signin';
    if (payload.pageType === 'AdminSignin') {
      url = '/api/admin/signin';
    }
    // url 判断
    return rest({
      url,
      method: 'post',
      data: {
        username: payload.signinForm.username,
        password: payload.signinForm.password,
      },
    }).then((resp) => {
      const token = resp.data.token;
      console.log('token', token);
      setToken(token);
      return resp;
    });
  },
  signOut({ commit }) {
    commit('setUserID', null);
    commit('setToken', null);
    return removeToken();
  },
  fetchUserInfo({ commit }, payload) {
    console.log(payload);
    return rest({
      url: '/api/client/info',
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
  modifyPassword({ commit }, payload) {
    console.log('modifyPassword', payload);
    return rest({
      url: '/api/common/post',
      method: 'post',
      data: {
        oPassword: payload.oPassword,
        nPassword: payload.nPassword,
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

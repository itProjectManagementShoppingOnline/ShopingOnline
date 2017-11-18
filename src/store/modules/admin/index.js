import rest from '@/utils/rest';
import { getToken, setToken, removeToken } from '@/utils/auth';


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
  signin({ commit }, payload = {}) {
    let code;
    const usernameTrimed = payload.username.trim();
    const passwordTrimed = payload.password.trim();
    return rest({
      url: '/admin/signin.post',
      method: 'post',
      data: {
        username: usernameTrimed,
        password: passwordTrimed,
      },
    }).then((resp) => {
      code = resp.data.code;
      // 成功
      if (code === 200) {
        commit('SET_TOKEN', resp.data.data.token);
      }
      return Promise.resolve(code);
    });
  },
  signOut({ commit }) {
    return rest({
      url: '/admin/signout.post',
      method: 'post',
      // params: {
      //   token: _state.token,
      // },
    }).then((resp) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      return Promise.resolve(resp);
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

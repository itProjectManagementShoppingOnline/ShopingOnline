import Cookies from 'js-cookie';
import rest from '@/utils/rest';

Cookies.expires = -1;

function getToken() {
  return Cookies.get('UserToken');
}

function setToken(token) {
  return Cookies.set('UserToken', token);
}

// function removeToken() {
//   return Cookies.remove(TokenKey);
// }


const state = {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
};

const getters = {
  token: _state => _state.token,
};

const actions = {
  signin({ commit }, payload = {}) {
    // console.log(this);
    // console.log(this.state.user.index.token);
    let code;
    const usernameTrimed = payload.username.trim();
    const passwordTrimed = payload.password.trim();
    return rest({
      url: '/user/signin/post',
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
      // alert(`actions ${code}`);
      return Promise.resolve(code);
    });
  },
};

/* eslint no-param-reassign: 0 */
const mutations = {
  SET_TOKEN: (_state, token) => {
    _state.token = token;
    setToken(token);
    // Cookies.get('UserToken');
    // alert(_state.token);
    // alert('this');
    // alert(this.state.token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

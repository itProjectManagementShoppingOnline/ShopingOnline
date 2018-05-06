import rest from '@/utils/rest';
import { setToken, getToken, removeToken } from '@/utils/auth';
import { getUserIDbyDecodeJSON } from '@/utils/decode';

const state = {
  userID: null,
  userName: '',
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
  userName: _state => _state.userName,
};

const actions = {
  login({ commit }, payload = {}) {
    return rest({
      url: 'http://139.199.165.118/api/login/',
      method: 'post',
      data: {
        username: payload.username,
        password: payload.password,
      },
    }).then((resp) => {
      const token = resp.data.token;
      setToken(token);
      return resp;
    });
  },
  logout() {
    console.log('logout');
    return removeToken();
  },
  fetchUserInfo({ commit }, payload) {
    return rest({
      url: `http://139.199.165.118/api/user/${payload.id}/info/`,
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

import rest from '@/utils/rest';
import { getToken, setToken, removeToken } from '@/utils/auth';


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
    // console.log(payload);
    // alert(payload.role);
    let code;
    const usernameTrimed = payload.signinForm.username.trim();
    const passwordTrimed = payload.signinForm.password.trim();
    // alert(usernameTrimed);

    return rest({
      url: '/api/user/signin/post',
      method: 'post',
      data: {
        username: usernameTrimed,
        password: passwordTrimed,
        role: payload.role,
      },
    }).then((resp, error) => {
      if (error) {
        return Promise.reject(error);
      }
      code = resp.data.code;
      console.log(code);
      console.log('data', resp.data.data.token);
      // 成功
      if (code === 200) {
        commit('SET_TOKEN', resp.data.data.token);
      }
      return Promise.resolve(code);
    }).catch((error) => {
      console.log(error);
      return Promise.resolve(error);
    });
  },
  signup({ commit }, payload = {}) {
    let code;
    const usernameTrimed = payload.signupForm.username.trim();
    const passwordTrimed = payload.signupForm.password.trim();
    const phoneNumTrimed = payload.signupForm.phoneNum.trim();

    return rest({
      url: '/api/user/signup',
      method: 'post',
      data: {
        username: usernameTrimed,
        password: passwordTrimed,
        phoneNum: phoneNumTrimed,
      },
    }).then((resp, error) => {
      if (error) {
        return Promise.reject(error);
      }
      console.log(resp);
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
      url: '/api/user/signout/post',
      method: 'post',
      // params: {
      //   token: _state.token,
      // },
    }).then((resp, error) => {
      if (error) {
        return Promise.reject(error);
      }
      // console.log(this.state);
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      return Promise.resolve(resp);
    });
  },
  getUserInfo({ commit, _state }) {
    return rest({
      url: '/api/user/info/get',
      method: 'get',
    }).then((resp) => {
      console.log('getUserInfo', state);
      console.log('getUserInfo', _state);
      // console.log(resp);
      // console.log(resp.data.data.role);
      commit('SET_ROLES', resp.data.data.role);
      return Promise.resolve(resp);
    }).catch((error) => {
      console.log(error);
      return Promise.resolve(error);
    });
  },
  getCartlist() {                                     //
    return rest({
      url: '/api/user/cart/goods/get/list',
      method: 'get',
    }).then((resp) => {
      console.log(resp);
      return Promise.resolve(resp);
    }).catch((error) => {
      console.log(error);
      return Promise.resolve(error);
    });
  },
  getUserorder() {                                    //
    return rest({
      url: '/api/user/order/get/list',
      method: 'get',
    });
  },
  sellergoodslist() {                           //
    return rest({
      url: '/api/user/seller/goods/list',
      method: 'get',
    }).then((resp) => {
      console.log(resp);
      return Promise.resolve(resp);
    }).catch((error) => {
      console.log(error);
      return Promise.resolve(error);
    });
  },
  sellerorderlist() {                          //
    return rest({
      url: '/api/user/seller/orders/list',
      method: 'get',
    }).then((resp) => {
      console.log(resp);
      return Promise.resolve(resp);
    }).catch((error) => {
      console.log(error);
      return Promise.resolve(error);
    });
  },
  openSellerCenter({ commit }, payload = {}) {             // 用户发送商家审核请求
    return rest({
      url: '/api/user/seller/open',
      method: 'post',
      data: {
        userID: payload.userID,
        userStatus: payload.istatus,
      },
    });
  },
  sellerupitem({ commit }, payload = {}) {               // 商家上传商品       //
    let code;
    const inametrim = payload.iname.trim();
    const imagURLtrim = payload.imagURL.trim();
    const ipricetrim = payload.iprice.trim();
    const iaddresstrim = payload.iaddress.trim();
    const idesctrim = payload.idesc.trim();
    const itypetrim = payload.itype.trim();
    return rest({
      url: '/api/user/seller/up/item',
      method: 'post',
      data: {
        iname: inametrim,
        imagURL: imagURLtrim,
        iprice: ipricetrim,
        iaddress: iaddresstrim,
        idesc: idesctrim,
        itype: itypetrim,
      },
    }).then((resp) => {
      code = resp.data.code;
      // 成功
      if (code !== 200) {
        console.log(code);
      }
      return Promise.resolve(code);
    });
  },
  sellercancelgood({ commit }, payload = {}) {         // 商家把自己商品下架        //
    const itemID = payload.Num;
    const itemname = payload.name;
    return rest({
      url: '/api/user/seller/cancel/good',
      method: 'post',
      data: {
        iID: itemID,
        iname: itemname,
      },
    });
  },
  postuserinfo({ commit }, payload = {}) {            // 用户修改完善个人信息       //
    const iuserID = payload.userID;
    const iusername = payload.username;
    const iimagURL = payload.picture;
    const iphonenum = payload.phone;
    const iemail = payload.email;
    return rest({
      url: '/api/user/post/info',
      method: 'post',
      data: {
        userID: iuserID,
        username: iusername,
        imgURL: iimagURL,
        phonenum: iphonenum,
        email: iemail,
      },
    });
  },
  addgoodintoCart({ commit }, payload = {}) {         // 将该商品加入用户购物车  //
    const ID = payload.iID;
    const name = payload.iname;
    return rest({
      url: '/api/user/add/item/cart',
      method: 'post',
      data: {
        iID: ID,
        iname: name,
        userID: payload.userID,
        inumber: payload.inumber,
      },
    });
  },
  deleteFromCart({ commit }, payload = {}) {                           // 将该商品从购物车移出   //
    const ID = payload.iID;
    const name = payload.iname;
    const number = payload.inumber;
    return rest({
      url: '/api/user/delete/item/cart',
      method: 'post',
      data: {
        iID: ID,
        iname: name,
        inumber: number,
      },
    });
  },
  addgoodIntoOrder({ commit }, payload = {}) {                          // 购买该商品，并将该商品添加到用户订单 //
    const ID = payload.iID;
    const name = payload.iname;
    const number = payload.inumber;
    return rest({
      url: '/api/user/add/item/order',
      method: 'post',
      data: {
        iID: ID,
        iname: name,
        inumber: number,
      },
    });
  },
  deleteUserOrder({ commit }, payload = {}) {                  //
    return rest({
      url: '/api/user/delete/user/order',
      method: 'post',
      data: {
        orderID: payload.orderID,
      },
    });
  },
  deleteSellerOrder({ commit }, payload = {}) {                    //
    return rest({
      url: '/api/user/delete/seller/order',
      method: 'post',
      data: {
        orderID: payload.orderID,
      },
    });
  },
  changeSellergoodinfo({ commit }, payload = {}) {                //
    return rest({
      url: '/api/user/change/sellergood/info',
      method: 'post',
      data: {
        info_change: payload,
      },
    });
  },
};

/* eslint no-param-reassign: 0 */
const mutations = {
  SET_TOKEN: (_state, token) => {
    // _state.token = token;
    // console.log('SET_TOKEN', state);
    // console.log('SET_TOKEN_', _state);
    // alert(token);
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

import Vue from 'vue';
import Router from 'vue-router';
import FrontIndex from '@/views/front/index';
import Signup from '@/views/front/signup';
import Signin from '@/views/front/signin';

import AdminSignin from '@/views/admin/signin';
import AdminIndex from '@/views/admin/index';
import OnSaleManage from '@/views/admin/onSaleManage';
import UploadManage from '@/views/admin/uploadManage';
import UserManage from '@/views/admin/userManage';
import Cart from '@/views/front/cart';
import UserInfo from '@/views/front/userinformation';
import GoodInfo from '@/views/front/goodsinfo';
import sellerCenter from '@/views/front/sellersgoodscenter';
import userOrder from '@/views/front/userOrder';
import SellerGoodInfo from '@/views/front/seller';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',             //   根
      name: 'FrontIndex',
      redirect: '/items/allProducts/1',
    }, {
      path: '/items/:type/:page',
      name: 'Items',
      component: FrontIndex,
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    }, {
      path: '/adminsignin',
      name: 'AdminSignin',
      component: AdminSignin,
    }, {
      path: '/admin',                      //  admin
      name: 'AdminIndex',
      component: AdminIndex,
    }, {
      path: '/admin/manage/onsale',
      name: 'OnSaleManage',
      component: OnSaleManage,
    }, {
      path: '/admin/manage/upitem',
      name: 'UploadManage',
      component: UploadManage,
    }, {
      path: '/admin/manage/user',
      name: 'UserManage',
      component: UserManage,
    }, {
      path: '/usercenter/sellercenter',
      name: 'sellerCenter',
      component: sellerCenter,
    }, {
      path: '/usercenter/cart',
      name: 'Cart',
      component: Cart,
    }, {
      path: '/usercenter/information',
      name: 'UserInfo',
      component: UserInfo,
    }, {
      path: '/good/info/:id',
      name: 'GoodInfo',
      component: GoodInfo,
    }, {
      path: '/usercenter/user/order',
      name: 'userOrder',
      component: userOrder,
    }, {
      path: '/usercenter/seller/:id',
      name: 'SellerGoodInfo',
      component: SellerGoodInfo,
    },
  ],
});
